const { Environment, Network, RecordSource, Store } = require('relay-runtime');

const graphQLEndpoint = 'http://localhost:3010/graphql';
const store = new Store(new RecordSource());

const network = Network.create((operation, variables) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('twitter.auth');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(graphQLEndpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  })
    .then(response => response.json());
});

const environment = new Environment({
  network,
  store,
});

export default environment;
