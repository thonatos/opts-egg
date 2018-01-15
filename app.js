'use strict';

module.exports = app => {
  app.beforeStart(function* () {
    yield app.model.sync({
      force: false,
    });
  });
};
