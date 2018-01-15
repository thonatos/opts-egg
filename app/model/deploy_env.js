'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;
  const Env = app.model.define('deploy_env', {
    key: STRING,
    value: STRING,
  }, {
    createdAt: false,
    updatedAt: false,
  });
  Env.associate = function() {
    app.model.DeployEnv.belongsTo(app.model.Deploy, { as: 'env', foreignKey: 'deploy_id' });
  };
  return Env;
};
