'use strict';

const TEMPLATE_DIR = './app/public/notification';

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const nunjucks = require('nunjucks');
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
    const { title, data, template } = message;
    const tpl = fs.readFileSync(path.join(TEMPLATE_DIR, template));
    const text = nunjucks.renderString(tpl.toString(), data);

    const msg = {
      msgtype: 'markdown',
      markdown: {
        title,
        text,
      },
    };

    if (!url) return;

    const { data: response } = await axios.post(url, msg);
    ctx.logger.info('#nofity.sendToDingtalkRobot', response);
  }
}

module.exports = NotifyService;
