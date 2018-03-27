'use strict';

const Controller = require('egg').Controller;

class RegistryController extends Controller {
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
        await ctx.service.notify.send({
          title: 'Image pushed',
          template: 'image_pushed.md',
          data,
        });

        // 部署应用
        const { image } = data;
        await ctx.service.deploy.trigger(image._id);

      } catch (error) {
        ctx.logger.error(error);
      }
    }

    ctx.status = 202;
  }
}

module.exports = RegistryController;
