'use strict';

const Controller = require('egg').Controller;

class HarborController extends Controller {
  async create() {
    const { ctx } = this;
    const { callbackUrl } = ctx.hook;
    const body = ctx.request.body;
    const events = ctx.helper.formatDockerRegistyEvents(body);

    for (const index in events) {
      const event = events[index];
      if (!event) {
        continue;
      }

      try {
        // 记录镜像
        const data = await ctx.service.image.create(event);

        // 部署应用
        const { image } = data;
        const deploy = await ctx.service.deploy.trigger(image._id);
        ctx.logger.info(deploy);

        // 发送通知
        await ctx.service.notify.send(callbackUrl, data, {
          type: 'dingtalk',
        });

      } catch (error) {
        ctx.logger.error(error);
      }
    }

    ctx.status = 202;
  }
}

module.exports = HarborController;
