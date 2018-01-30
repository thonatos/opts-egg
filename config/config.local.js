'use strict';

exports.mongoose = {
  url: 'mongodb://localhost/devops',
  options: {},
};

exports.io = {
  init: {
    wsEngine: 'uws',
  },
  namespace: {
    '/docker': {
      connectionMiddleware: [
        'docker',
      ],
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

exports.administrator = {
  username: 'suyi',
  password: '123456',
  userrole: 'admin',
};

exports.notifications = {
  dingtalk: {
    type: 'dingtalk',
    callbackUrl: 'https://oapi.dingtalk.com/robot/send?access_token=xxxxx',
  },
};
