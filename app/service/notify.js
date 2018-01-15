'use strict';

const axios = require('axios');
const Service = require('egg').Service;

class NotifyService extends Service {
  // https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.karFPe&treeId=257&articleId=105735&docType=1
  async sendToDingtalkRobot(callbackUrl, message) {
    try {
      const { data } = await axios.post(callbackUrl, message);
      console.log('#nofity.sendToDingtalkRobot', data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = NotifyService;
