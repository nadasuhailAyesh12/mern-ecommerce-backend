class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } :
            {}

        this.query = this.query.find({ ...keyword })
        return this;
    }

    filter() {
        /* since the endpoint for search and filter we need to remove keyword limit page
         from req.query since they are not attributes in our model
        then to make query filter price in specific range we need to get use of mongoo 
        aggregation functions we want to get them from query and use regex to replace 
        whenever they are greater,less,greaterorequal ,lessorequal with dollar sign
       front of them
         */

        const queryCopy = { ...this.queryString }
        const filedsToRemove = ['keyword', 'limit', 'page'];
        filedsToRemove.map(element => delete queryCopy[element]);
        let filterQueryString = JSON.stringify(queryCopy)
        filterQueryString = filterQueryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        this.query = this.query.find(JSON.parse(filterQueryString))
        return this;
    }
}

module.exports = APIFeatures