'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;
  const Cluster = app.model.define('cluster', {
    name: STRING,
    region: STRING,
    masterUrl: STRING(1024),
    ca: TEXT,
    key: TEXT,
    cert: TEXT,
  });
  return Cluster;
};
