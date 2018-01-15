'use strict';

const Controller = require('egg').Controller;

class HarborController extends Controller {
  async create() {
    const { ctx, app } = this;
    const { callbackUrl } = ctx.hook;
    const body = ctx.request.body;
    const events = ctx.helper.formatDockerRegistyEvents(body);

    for (const index in events) {
      const event = events[ index ];
      if (!event) {
        continue;
      }

      try {
        // 记录镜像
        const { image, tag } = await ctx.service.image.create(event);

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

      } catch (error) {
        app.logger.error(error);
      }
    }

    ctx.status = 202;
  }
}

module.exports = HarborController;
