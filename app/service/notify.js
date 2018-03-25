'use strict';

const axios = require('axios');
const Service = require('egg').Service;

class NotifyService extends Service {
  async send(message) {
    const { ctx } = this;
    const { senders, adapters } = ctx.app.config.notifications;

    for (const sender of senders) {
      const adapter = adapters[sender];

      try {
        await this.handle(sender, adapter, message);
      } catch (error) {
        ctx.logger.error(error);
      }
    }
  }

  async handle(sender, adapter, message) {
    const { ctx } = this;

    let handler = async () => {
      ctx.logger.info('#not implemented');
    };

    if (sender === 'dingtalk') {
      ctx.logger.info('#dingtalk');
      handler = this.sendToDingtalkRobot;
    }

    return handler.call(this, adapter, message);
  }

  // https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.karFPe&treeId=257&articleId=105735&docType=1
  async sendToDingtalkRobot(config, message) {
    const { ctx } = this;
    const { url } = config;
    const { image, tag } = message;
    const msg = {
      msgtype: 'markdown',
      markdown: {
        title: '#Image Pushed',
        text: `${image.name} \n\n` +
          `> 区域：${image.region} \n\n` +
          `> 版本：${tag.tag} \n\n` +
          `> 时间：${tag.pushed_at} \n\n`,
      },
    };
    if (!url) return;
    const { data } = await axios.post(url, msg);
    ctx.logger.info('#nofity.sendToDingtalkRobot', data);
  }
}

module.exports = NotifyService;
