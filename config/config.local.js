'use strict';

exports.sequelize = {
  dialect: 'mysql',
  database: 'devops',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: 'mysql',
};

exports.io = {
  init: {
    wsEngine: 'uws',
  }, // passed to engine.io
  namespace: {
    '/webrtc': {
      connectionMiddleware: [ 'docker' ],
      packetMiddleware: [],
    },
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
};

exports.jwt = {
  secret: 'opts',
  enable: true,
  match: '/api',
};
