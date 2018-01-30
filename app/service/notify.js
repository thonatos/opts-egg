'use strict';

const axios = require('axios');
const Service = require('egg').Service;

class NotifyService extends Service {
  async send(url, msg, opts = {}) {
    const { ctx } = this;
    switch (opts.type) {
      case 'dingtalk':
        return this.sendToDingtalkRobot(...arguments);

      default:
        ctx.logger.info('not implemented');
        break;
    }
    return null;
  }

  // https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.karFPe&treeId=257&articleId=105735&docType=1
  async sendToDingtalkRobot(url, data) {
    const { ctx } = this;
    const { image, tag } = data;
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
    try {
      const { data } = await axios.post(url, msg);
      ctx.logger.info('#nofity.sendToDingtalkRobot', data);
    } catch (error) {
      ctx.logger.error(error);
    }
  }
}

module.exports = NotifyService;
