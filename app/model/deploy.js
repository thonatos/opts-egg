'use strict';
const mongoosePaginate = require('mongoose-paginate');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = new mongoose.Schema({
    cluster: String,
    app: String,
    template: String,
    envs: [{
      key: String,
      value: String,
    }],
    images: [{
      key: String,
      image_id: String,
    }],
    enabled: Boolean,
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });

  Schema.plugin(mongoosePaginate);
  return mongoose.model('Deploy', Schema);
};
