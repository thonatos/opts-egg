'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;
  const Image = app.model.define('image', {
    namespace: STRING(512),
    region: STRING,
    name: STRING,
    repo_full_name: STRING(1024),
  });
  Image.associate = function() {
    app.model.Image.hasMany(app.model.ImageTag, { as: 'tags', foreignKey: 'image_id' });
  };
  return Image;
};
