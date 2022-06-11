const express = require('express');
const app = express();
const path = require('path');
const helmet = require("helmet");
const cors = require("cors");
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
app.set('trust proxy', 1)
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));
// setup public folder

app.use(express.static("./src/public"));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());



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
// setup router
const authRouter = require('./src/routes/auth-router');
const jobRouter = require('./src/routes/job-router');
const authMiddelware = require("./src/middleware/auth-middle");
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddelware, jobRouter);

app.use(notFound);
