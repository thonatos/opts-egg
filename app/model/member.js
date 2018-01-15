'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;
  const Member = app.model.define('member', {
    username: STRING(32),
    userpass: STRING(256),
    userrole: STRING(64),
  });
  return Member;
};
