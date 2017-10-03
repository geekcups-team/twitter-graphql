module.exports = {
  apps: [
    {
      name: 'Twitter API',
      script: 'server/app.js',
      interpreter: 'node@8.5.0',
      env: {
        EXPRESS_PORT: 3100,
      },
    },
  ],

  deploy: {
    production: {
      user: 'deployer',
      host: 'api-twitter.geekcups.com',
      ref: 'origin/master',
      repo: 'https://github.com/geekcups-team/twitter-graphql',
      path: '/home/deployer/apps/production/twitter-graphq_server',
      'post-deploy': '/home/deployer/.nvm/versions/node/v6.10.0/bin/npm install && /home/deployer/.nvm/versions/node/v6.10.0/lib/node_modules/pm2/bin/pm2 startOrRestart server/ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production',
        EXPRESS_PORT: 3100,
      },
    },
  },
};
