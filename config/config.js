var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'nodeapp'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/nodeapp-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'nodeapp'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/nodeapp-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'nodeapp'
    },
    port: process.env.PORT,
    db: 'mongodb://localhost/nodeapp-production'
  }
};

module.exports = config[env];
