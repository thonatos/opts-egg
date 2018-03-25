'use strict';

const getWhiteList = () => {
  return [
    'http://localhost:3000',
  ].concat(
    process.env.EGG_WHITELIST && process.env.EGG_WHITELIST.split(',') || []
  );
};

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1505898084646_4945';

  // add your config here
  config.logger = {
    level: process.env.EGG_DEBUG ? 'DEBUG' : 'INFO',
    consoleLevel: process.env.EGG_DEBUG ? 'DEBUG' : 'INFO',
  };

  config.bodyParser = {
    extendTypes: {
      json: [
        'application/vnd.docker.distribution.events.v1+json',
      ],
    },
  };

  config.middleware = [
    'graphql',
    'auth',
  ];

  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.auth = {
    enable: true,
    match: '/hook/docker',
  };

  // Security
  config.cors = {
    allowMethods: 'GET,HEAD,OPTIONS,PUT,POST,DELETE,PATCH',
    credentials: true,
  };

  config.security = {
    domainWhiteList: getWhiteList(),
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

  config.maidops = {
    accessToken: process.env.EGG_MAIDOPS_ACCESS_TOKEN || 'access_token',
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
    agent: true,
  };

  // Notifications
  config.notifications = {
    senders: [
      'dingtalk',
    ],
    adapters: {
      dingtalk: {
        url: process.env.EGG_DINGTALK_ROBOT_URL || '',
      },
    },
  };
  return config;
};
