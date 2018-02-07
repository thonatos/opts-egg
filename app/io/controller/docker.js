'use strict';

const Controller = require('egg').Controller;

class ExchangeController extends Controller {
  async exchange() {
    const { ctx, app } = this;
    const nsp = app.io.of('/docker');
    const client = ctx.socket.id;
    const message = ctx.args[0] || {};

    try {
      const { target, payload } = message;
      if (!target) {
        return;
      }
      const msg = ctx.helper.parseMsg('exchange', payload, {
        client,
        target,
      });
      nsp.emit(target, msg);
    } catch (error) {
      ctx.logger.error(error);
    }
  }
}

module.exports = ExchangeController;

