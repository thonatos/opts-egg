'use strict';
const mongoosePaginate = require('mongoose-paginate');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = new mongoose.Schema({
    app: String,
    template: String,
    enabled: Boolean,
    cluster: {
      name: String,
      cluster_id: String,
    },
    trigger: {
      image_id: String,
      repo_full_name: String,
    },
    envs: [{
      key: String,
      value: String,
    }],
    images: [{
      key: String,
      image_id: String,
      repo_full_name: String,
    }],
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });

  Schema.plugin(mongoosePaginate);
  return mongoose.model('Deploy', Schema);
};
