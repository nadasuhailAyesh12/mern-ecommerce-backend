const { port } = require('./config/enviroment');
const app = require('./app.js');
const dbConnection = require('./db/connection');

process.on('uncaughtException', err => {
    console.log(`Error:${err.message}`);
    console.log('shutting down the server due to uncaught exception')
    process.exit(1);
})

dbConnection()

const server = app.listen(port, () => {
    console.log(` server is listening on port ${port} `);
})


