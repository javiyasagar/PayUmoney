const express = require("express");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/', require('./app/route/route'));


const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const logger = require("./app/loggers/logger")

const port = process.env.PORT || 4030;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
