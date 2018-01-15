'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;
  const Image = app.model.define('deploy_image', {
    key: STRING,
  }, {
    createdAt: false,
    updatedAt: false,
  });
  Image.associate = function() {
    app.model.DeployImage.belongsTo(app.model.Deploy, { as: 'image', foreignKey: 'deploy_id' });
    app.model.DeployImage.belongsTo(app.model.Image, { as: 'repo', foreignKey: 'image_id' });
  };
  return Image;
};
