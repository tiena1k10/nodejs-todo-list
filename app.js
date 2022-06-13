const express = require('express');
const app = express();
const path = require('path');
// setup public folder
app.use(express.static("./src/public"));
app.use(express.json());
//const port = process.env.PORT || 8888;
const notFound = require('./src/middleware/not-found');

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const db = require("./src/db/connect");
require('dotenv').config();
const port = process.env.PORT || 8888;
db.connect().then(() => {
    console.log("Connect Database thanh cong");
    return app.listen(port);
}).then(() => {
    console.log(`Server is listening on: http://localhost:${port}`);
})
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./swagger.json");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// setup router

const taskRouter = require('./src/routes/task-router');
app.use('/api/v1/task', taskRouter);
app.use(notFound);
