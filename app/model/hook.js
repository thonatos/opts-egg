'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;
  const Hook = app.model.define('hook', {
    name: STRING,
    callbackUrl: STRING(1024),
    accessToken: STRING(1024),
  });
  return Hook;
};
