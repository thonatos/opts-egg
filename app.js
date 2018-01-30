'use strict';

module.exports = app => {
  const initAdministrator = async () => {
    const administrator = app.config.administrator || false;
    if (!administrator) {
      app.logger.info(`\n
      #WARNING: 

        Please add default administrator to config.{env}.js
        Or add it to collection.member .
      \n`);
      return;
    }

    const { username, userrole, password } = administrator;

    const existed = await app.model.Member.findOne({
      username,
      userrole,
    });

    if (existed) return;

    const newAdmin = new app.model.Member({
      username,
      userrole,
    });
    newAdmin.setPassword(password);
    await newAdmin.save();

    app.logger.info(`\n
    #INFO: 

      Administrator(${username}) has been added to database .
    \n`);
  };

  app.beforeStart(async () => {
    await initAdministrator();
  });
};
