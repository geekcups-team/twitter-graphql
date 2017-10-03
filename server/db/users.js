module.exports = [
  {
    id: 'donald_id',
    username: 'donald',
    password: 'password',
    token: 'donald_token',
    follows: ['kim_id'],
  },
  {
    id: 'kim_id',
    username: 'kim',
    password: 'password',
    token: 'kim_token',
    follows: ['donald_id'],
  },
  {
    id: 'razzi_id',
    username: 'razzi',
    password: 'password',
    token: 'razzi_token',
    follows: ['donald_id', 'kim_id'],
  },
  {
    id: 'albano_id',
    username: 'albano',
    password: 'password',
    token: 'albano_token',
    follows: ['kim_id', 'razzi_id'],
  },
];
