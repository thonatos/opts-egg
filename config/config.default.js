'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1505898084646_4945';

  // add your config here
  config.bodyParser = {
    extendTypes: {
      json: [
        'application/vnd.docker.distribution.events.v1+json',
      ],
    },
  };

  config.middleware = [
    'graphql',
    'dockerHookAuth',
  ];

  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // Security
  config.cors = {
    allowMethods: 'GET,HEAD,OPTIONS,PUT,POST,DELETE,PATCH',
    credentials: true,
  };

  config.security = {
    domainWhiteList: [
      'http://localhost:3000', // dev
    ],
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };

  // Auth
  config.jwt = {
    secret: 'opts',
    enable: true,
    match: '/api',
  };

  config.dockerHookAuth = {
    enable: true,
    match: '/hook/docker',
  };

  config.administrator = {
    username: process.env.EGG_ADMINISTRATOR_USERNAEM || 'suyi',
    password: process.env.EGG_ADMINISTRATOR_PASSWORD || '123456',
    userrole: 'admin',
  };

  // Database
  config.mongoose = {
    url: process.env.EGG_MONGOOSE_URL || 'mongodb://localhost:27017/devops',
    options: {},
  };

  // Notifications
  config.notifications = {
    dingtalk: {
      type: 'dingtalk',
      callbackUrl: process.env.EGG_DINGTALK_ROBOT_URL || '',
    },
  };
  return config;
};
