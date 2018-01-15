'use strict';

module.exports = app => {
  const { TEXT, STRING } = app.Sequelize;
  const Deploy = app.model.define('deploy', {
    template: TEXT,
    app: STRING,
  });
  Deploy.associate = function() {
    app.model.Deploy.belongsTo(app.model.Cluster, { as: 'cluster', foreignKey: 'cluster_id' });
    app.model.Deploy.hasMany(app.model.DeployEnv, { as: 'env', foreignKey: 'deploy_id' });
    app.model.Deploy.hasMany(app.model.DeployImage, { as: 'image', foreignKey: 'deploy_id' });
  };
  return Deploy;
};
