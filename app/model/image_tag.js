'use strict';

module.exports = app => {
  const { STRING, DATE } = app.Sequelize;
  const Tag = app.model.define('image_tag', {
    digest: STRING,
    tag: STRING,
    pushed_at: DATE,
  }, {
    createdAt: false,
    updatedAt: false,
  });
  Tag.associate = function() {
    app.model.ImageTag.belongsTo(app.model.Image, { as: 'tags', foreignKey: 'image_id' });
  };
  return Tag;
};
