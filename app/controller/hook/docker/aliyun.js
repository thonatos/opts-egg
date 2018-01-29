'use strict';

const Controller = require('egg').Controller;

class AliyunController extends Controller {
  async create() {
    const { ctx } = this;
    const { deployId } = ctx.query;
    const { callbackUrl } = ctx.hook || {};
    const body = ctx.request.body;

    // 记录镜像
    const { image, tag } = await this.ctx.service.image.create(body);

    // 更新应用
    if (deployId) {
      await ctx.service.deploy.update(deployId);
    }

    // 发送通知
    await ctx.service.notify.sendToDingtalkRobot(callbackUrl, {
      msgtype: 'markdown',
      markdown: {
        title: '#Image Pushed',
        text: `${image.get('name')} \n\n` +
          `> 区域：${image.get('region')} \n\n` +
          `> 版本：${tag.get('tag')} \n\n` +
          `> 时间：${tag.get('pushed_at')} \n\n`,
      },
    });

    ctx.status = 204;
  }
}

module.exports = AliyunController;
