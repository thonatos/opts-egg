'use strict';

const crypto = require('crypto');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
    },
    userrole: String,
    salt: String,
    hash: String,
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });
  Schema.methods.setPassword = function(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHmac('sha256', salt).update(password).digest('hex');
    this.salt = salt;
    this.hash = hash;
  };
  Schema.methods.validPassword = function(password) {
    const salt = this.salt;
    const hash = crypto.createHmac('sha256', salt).update(password).digest('hex');
    return this.hash === hash;
  };
  return mongoose.model('Member', Schema);
};
