'use strict';

const Controller = require('egg').Controller;

class AliyunController extends Controller {
  async create() {
    const { ctx } = this;
    const { deployId } = ctx.query;
    const { callbackUrl } = ctx.hook || {};
    const body = ctx.request.body;

    // 记录镜像
    const data = await this.ctx.service.image.create(body);

    // 更新应用
    if (deployId) {
      await ctx.service.deploy.update(deployId);
    }

    // 发送通知
    await ctx.service.notify.send(callbackUrl, data, {
      type: 'dingtalk',
    });

    ctx.status = 204;
  }
}

module.exports = AliyunController;
