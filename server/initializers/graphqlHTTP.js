const graphqlHTTP = require('express-graphql');
const winston = require('winston');

const expressInitializer = require('./express');
const graphqlSchemaInitializer = require('./graphqlSchema');
const db = require('../db');

const bearerRegex = /Bearer\s(\S+)/;

async function init() {
  const [app, graphqlSchema] = await Promise.all([expressInitializer, graphqlSchemaInitializer]);

  app.use('/graphql', (req, res, next) => {
    let currentUser;
    const authorizationHeader = req.headers.authorization;
    const authorizationMatchs = authorizationHeader.match(bearerRegex);
    if (authorizationMatchs && authorizationMatchs.length) {
      const token = authorizationMatchs[1];
      currentUser = db.users.data.find(user => user.token === token);
    }
    if (!currentUser) {
      currentUser = false;
    }
    currentUser.profile = db.profiles.data.find(profile => profile.userId === currentUser.id);
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
        baseUrl: `${req.protocol}://${req.get('host')}`,
      },
    })(req, res)
  ));
}

module.exports = init();
