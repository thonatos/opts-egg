'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    const defaultAdmin = {
      username: 'suyi',
      password: '123456',
      userrole: 'admin',
    };

    const existAdmin = await app.model.Member.findOne(defaultAdmin);
    app.logger.info('#existAdmin:\n', existAdmin);

    if (existAdmin) return;

    const newAdmin = new app.model.Member(defaultAdmin);
    await newAdmin.save();
    app.logger.info('#newAdmin:\n', newAdmin);
  });
};
