const users = require('./users');
const tweets = require('./tweets');
const profiles = require('./profiles');

module.exports = {
  users: {
    data: users,
  },
  tweets: {
    data: tweets,
  },
  profiles: {
    data: profiles,
  },
};
