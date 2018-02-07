'use strict';

// had enabled by egg
// exports.static = true;

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.graphql = {
  enable: true,
  package: 'egg-graphql',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};
