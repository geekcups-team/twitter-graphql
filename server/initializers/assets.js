const express = require('express');
const config = require('config');

const expressInitializer = require('./express');

async function init() {
  const app = await expressInitializer;
  app.use('/assets', express.static(config.get('assetsPath')));
}

module.exports = init();
