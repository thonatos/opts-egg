'use strict';

const Controller = require('egg').Controller;

class AliyunController extends Controller {
  async create() {
    const { ctx } = this;
    const { callbackUrl } = ctx.hook || {};
    const body = ctx.request.body;

    // 记录镜像
    const data = await this.ctx.service.image.create(body);

    // 部署应用
    const { image } = data;
    const deploy = await ctx.service.deploy.update(image._id);
    ctx.app.logger.info(deploy);

    // 发送通知
    await ctx.service.notify.send(callbackUrl, data, {
      type: 'dingtalk',
    });
    ctx.status = 204;
  }
}

module.exports = AliyunController;
