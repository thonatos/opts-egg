'use strict';

const mongoosePaginate = require('mongoose-paginate');
const options = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = new mongoose.Schema({
    app: String,
    template: String,
    enabled: Boolean,
    platform: {
      type: String,
      default: 'docker',
    },
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
  }, options);

  Schema.plugin(mongoosePaginate);
  return mongoose.model('Deploy', Schema);
};
