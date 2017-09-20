const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compress = require('compression');

const app = express();

async function init() {
  app.use(cors());
  app.use(bodyParser.json({
    limit: '5mb',
  }));

  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(compress());

  return app;
}

module.exports = init();
