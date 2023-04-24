const http = require('http');

const { port } = require('./config/enviroment');
const app = require('./app.js');
const dbConnection = require('./db/connection');
const server = http.createServer(app)

process.on('uncaughtException', err => {
    console.log(`Error:${err.message}`);
    console.log('shutting down the server due to uncaught exception')
    process.exit(1);
})

dbConnection().then(() => server.listen(port, () => {
    console.log(` server is listening on port ${port} `);
}))
    .catch(err => console.error(err))



