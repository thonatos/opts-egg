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
    name: {
      type: String,
      require: true,
    },
    host: {
      type: String,
      require: true,
    },
    namespace: {
      type: String,
      require: true,
    },
    ca: {
      type: String,
      require: false,
    },
    key: {
      type: String,
      require: false,
    },
    cert: {
      type: String,
      require: false,
    },
    user: {
      type: String,
      require: false,
    },
    pass: {
      type: String,
      require: false,
    },
  }, options);

  Schema.plugin(mongoosePaginate);
  return mongoose.model('ClusterKubernetes', Schema);
};
