'use strict';

const Service = require('egg').Service;

class DeployService extends Service {

  async getImages(images = []) {
    const { ctx } = this;
    const environment = {};
    for (const img of images) {
      if (!img) {
        continue;
      }
      const { key, image_id: _id } = img;
      const image = await ctx.model.Image.findOne({ _id });
      const imageTag = await ctx.model.ImageTag.findOne({ image: _id }, null, { sort: { created_at: -1 } });
      if (image && imageTag) {
        environment[key] = image.repo_full_name + ':' + imageTag.tag;
      }
    }
    return environment;
  }

  async getEnvs(envs = []) {
    const environment = {};
    envs.forEach((key, value) => {
      environment[key] = value;
    });
    return environment;
  }

  async update(deploy) {
    const { ctx } = this;
    const { template, app: appName, cluster: clusterInfo, envs, images, enabled, platform } = deploy;
    const { cluster_id: clusterId } = clusterInfo;

    ctx.logger.debug('deploy', deploy);

    const message = {
      title: 'Deployment',
      template: 'deploy.md',
      data: {
        appName,
        platform,
        clusterId,
      },
    };

    if (!enabled) {
      message.data.message = 'deploy is disabled';
      await ctx.service.notify.send(message);
      return;
    }

    if (!platform) {
      message.data.message = 'platform is required';
      await ctx.service.notify.send(message);
      return;
    }

    // environment
    const _envs = await this.getEnvs(envs);
    const _images = await this.getImages(images);
    const environment = Object.assign({}, _images, _envs);
    const version = Date.now().toString();

    message.data.environment = environment;

    // update
    const handler = platform === 'kubernetes'
      ? ctx.service.kubernetes.updateDeployments
      : ctx.service.docker.updateApp;

    try {
      await handler.call(this, clusterId, appName, {
        environment,
        template,
        version,
      });
      message.data.message = 'submitted';
      await ctx.service.notify.send(message);

    } catch (error) {
      message.data.message = 'error';
      await ctx.service.notify.send(message);
    }
  }

  async trigger(triggerId = '') {
    const { ctx } = this;
    const deploys = await ctx.model.Deploy.find({
      'trigger.image_id': triggerId,
    });

    if (deploys.length === 0) {
      return;
    }

    for (const deploy of deploys) {
      await this.update(deploy);
    }
  }
}

module.exports = DeployService;
