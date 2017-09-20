const { nodeDefinitions, fromGlobalId } = require('graphql-relay');

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId, context) => {
    const { type, id } = fromGlobalId(globalId);
    let dbField;
    switch (type) {
      case 'User':
        dbField = 'users';
        break;
      case 'Tweet':
        dbField = 'tweets';
        break;
      default: throw new Error('Invalid Type', type);
    }
    const result = context.db[dbField].find(item => item.id === id);

    if (!result) throw new Error('Cannot find node', globalId);

    result.__type = type; // eslint-disable-line no-underscore-dangle
    return result;
  },
  (obj) => {
    switch (obj.__type) { // eslint-disable-line no-underscore-dangle
      case 'User':
        return require('../types/user'); // eslint-disable-line global-require
      case 'Tweet':
        return require('../types/tweet'); // eslint-disable-line global-require
      default: throw new Error('Invalid object', obj);
    }
  },
);

module.exports = {
  nodeInterface,
  nodeField,
};
