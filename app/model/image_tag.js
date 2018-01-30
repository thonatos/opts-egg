'use strict';
const mongoosePaginate = require('mongoose-paginate');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = new mongoose.Schema({
    image: String,
    digest: String,
    tag: String,
    pushed_at: Date,
  }, {
    collection: 'images_tags',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });

  Schema.plugin(mongoosePaginate);
  return mongoose.model('ImageTag', Schema);
};
