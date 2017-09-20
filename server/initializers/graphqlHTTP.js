const graphqlHTTP = require('express-graphql');
const winston = require('winston');

const expressPromise = require('./express');
const graphqlSchemaPromise = require('./graphqlSchema');
const db = require('../db');

const bearerRegex = /Bearer\s(\S+)/;

async function init() {
  const [app, graphqlSchema] = await Promise.all([expressPromise, graphqlSchemaPromise]);

  app.use('/graphql', (req, res, next) => {
    let currentUser;
    const authorizationHeader = req.headers.authorization;
    const authorizationMatchs = authorizationHeader.match(bearerRegex);
    if (authorizationMatchs && authorizationMatchs.length) {
      const token = authorizationMatchs[1];
      currentUser = db.users.find(user => user.token === token);
    }
    if (!currentUser) {
      currentUser = false;
    }
    req.user = currentUser;
    next();
  });

  app.use('/graphql', (req, res) => (
    graphqlHTTP({
      schema: graphqlSchema,
      graphiql: false,
      formatError: (error) => {
        winston.log('error', error);
        return {
          message: error.message,
          locations: error.locations,
          path: error.path,
        };
      },
      context: {
        db,
        currentUser: req.user,
      },
    })(req, res)
  ));
}

module.exports = init();
