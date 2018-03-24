'use strict';

const Controller = require('egg').Controller;

const formatDockerRegistyEvents = ({ push_data, repository, region = 'default' }) => {
  const { tag, images } = push_data;
  const { namespace, name, repo_name: repo_full_name } = repository;
  return {
    push_data: {
      tag,
      digest: images[0],
      pushed_at: new Date(),
    },
    repository: {
      name,
      region,
      namespace,
      repo_full_name,
    },
  };
};

class HubController extends Controller {
  async create() {
    const { ctx } = this;
    const { callbackUrl } = ctx.hook || {};
    const body = ctx.request.body;
    const event = formatDockerRegistyEvents(body);

    // 记录镜像
    const data = await this.ctx.service.image.create(event);

    // 部署应用
    const { image } = data;
    const deploy = await ctx.service.deploy.trigger(image._id);
    ctx.logger.info(deploy);

    // 发送通知
    await ctx.service.notify.send(callbackUrl, data, {
      type: 'dingtalk',
    });
    ctx.status = 204;
  }
}

module.exports = HubController;
