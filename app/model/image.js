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
    name: String,
    namespace: String,
    region: String,
    repo_full_name: String,
  }, options);

  Schema.plugin(mongoosePaginate);
  return mongoose.model('Image', Schema);
};
