'use strict';

const Service = require('egg').Service;

class HookService extends Service {
  async find(accessToken) {
    const { ctx } = this;
    const hook = await ctx.model.Hook.findOne({
      where: {
        accessToken,
      },
    });
    return hook || null;
  }
}

module.exports = HookService;
