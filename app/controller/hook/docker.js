'use strict';

const Controller = require('egg').Controller;

class DockerController extends Controller {
  async handle() {
    const { ctx } = this;
    const events = ctx.events;

    for (const index in events) {
      const event = events[index];
      if (!event) {
        continue;
      }

      try {
        // 记录镜像
        const data = await ctx.service.image.create(event);

        // 发送通知
        await ctx.service.notify.send(data);

        // 部署应用
        const { image } = data;
        const deploy = await ctx.service.deploy.trigger(image._id);
        ctx.logger.info(deploy);

      } catch (error) {
        ctx.logger.error(error);
      }
    }

    ctx.status = 202;
  }
}

module.exports = DockerController;
