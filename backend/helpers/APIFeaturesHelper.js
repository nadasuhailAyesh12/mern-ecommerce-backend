class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword
            ? {
                name: {
                    $regex: this.queryString.keyword,
                    $options: "i",
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryString };
        const filedsToRemove = ["keyword", "limit", "page", "sorter"];
        filedsToRemove.map((element) => delete queryCopy[element]);
        let filterQueryString = JSON.stringify(queryCopy);
        this.query = this.query.find(JSON.parse(filterQueryString));
        return this;
    }

    pagination() {
        const resultsPerPage = this.queryString.limit || 4;
        const currentPage = this.queryString.page || 1;
        const skip = resultsPerPage * (currentPage - 1);
        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
    sort() {
        this.query =
            this.queryString.sorter == "price"
                ? this.query.sort({ price: 1 })
                : this.query.sort({ ratings: -1 });
        return this;
    }
}

module.exports = APIFeatures;
