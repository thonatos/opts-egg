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

    // environment
    const environment = {};

    // images
    for (let index = 0; index < images.length; index++) {
      const { key, image_id: _id } = images[index];
      const image = await ctx.model.Image.findOne({ _id });
      const imageTag = await ctx.model.ImageTag.findOne({ image: _id });
      if (image && imageTag) {
        environment[key] = image.repo_full_name + ':' + imageTag.tag;
      }
    }

    // envs
    for (const index in envs) {
      const { key, value } = envs[index];
      if (!key) continue;
      environment[key] = value;
    }

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
