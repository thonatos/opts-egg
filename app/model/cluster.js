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
    region: String,
    host: String,
    ca: String,
    key: String,
    cert: String,
  }, options);

  Schema.plugin(mongoosePaginate);
  return mongoose.model('Cluster', Schema);
};
