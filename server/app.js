const glob = require('glob');
const config = require('config');
const expressInitializer = require('./initializers/express');
const winston = require('winston');

const rootPath = config.get('rootPath');
const initializerFiles = glob.sync(`${rootPath}/initializers/*.js`);

async function init() {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  await Promise.all(initializerFiles.map(file => require(file)));
  const app = await expressInitializer;
  const port = config.get('expressPort');
  app.listen(port);
  winston.log('info', `Express listen ${port}`);
}

init()
  .then(() => winston.log('info', 'App started'))
  .catch(err => winston.log('error', err));
