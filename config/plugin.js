'use strict';

// had enabled by egg
// exports.static = true;


exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.graphql = {
  enable: true,
  package: 'egg-graphql',
};

exports.io = {
  enable: true,
  package: 'egg-socket.io',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};
