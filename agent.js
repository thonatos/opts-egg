'use strict';

module.exports = agent => {
  const initAdministrator = async () => {
    const administrator = agent.config.administrator || false;
    if (!administrator) {
      agent.logger.info(`\n
      #WARNING: 

        Please add default administrator to config.{env}.js
        Or add it to collection.member .
      \n`);
      return;
    }

    const { username, userrole, password } = administrator;

    const existed = await agent.model.Member.findOne({
      username,
      userrole,
    });

    agent.logger.info('existed', existed);

    if (existed) return;

    const newAdmin = new agent.model.Member({
      username,
      userrole,
    });
    newAdmin.setPassword(password);
    await newAdmin.save();

    agent.logger.info(`\n
    #INFO: 

      Administrator(${username}) has been added to database .
    \n`);
  };

  agent.beforeStart(async () => {
    await initAdministrator();
  });
};
