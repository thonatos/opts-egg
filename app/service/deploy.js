'use strict';

const Service = require('egg').Service;

class DeployService extends Service {
  async update(triggerId = '') {
    const { ctx } = this;

    const deploy = await ctx.model.Deploy.findOne({
      trigger: triggerId,
    });

    if (!deploy) {
      this.ctx.throw(500, 'not exist');
    }

    const { template, app: appName, cluster: clusterId, envs, images, enabled } = deploy;

    if (!enabled) {
      return {
        message: 'deploy has been disabled.',
      };
    }

    console.log(clusterId, envs, images);

    // environment
    const environment = {};

    // images
    images.forEach(async ({ key, image_id: _id }) => {
      const image = await ctx.model.Image.findOne({ _id });
      const imageTag = await ctx.model.ImageTag.findOne({ _id });
      if (!image || !imageTag) return;
      environment[key] = image.repo_full_name + ':' + imageTag.tag;
    });

    // envs
    envs.forEach(({ key, value }) => {
      if (!key) return;
      environment[key] = value;
    });

    // update
    const result = await this.ctx.service.cluster.updateApp(clusterId, appName, {
      environment,
      template,
      version: Date.now().toString(),
    });

    console.log('#deploy.update', result);

    return result;
  }

}

module.exports = DeployService;
