'use strict';

const Service = require('egg').Service;

class DeployService extends Service {
  async update(triggerId = '') {
    const { ctx } = this;

    const deploy = await ctx.model.Deploy.findOne({
      'trigger.image_id': triggerId,
    });

    if (!deploy) {
      return {
        message: 'deploy not exist.',
      };
    }

    const { template, app: appName, cluster: clusterInfo, envs, images, enabled } = deploy;
    const { cluster_id: clusterId } = clusterInfo;

    if (!enabled) {
      return {
        message: 'deploy has been disabled.',
      };
    }

    // environment
    const environment = {};

    // images
    for (const img of images) {
      const { key, image_id: _id } = img;
      const image = await ctx.model.Image.findOne({ _id });
      const imageTag = await ctx.model.ImageTag.findOne({ image: _id });
      if (image && imageTag) {
        environment[key] = image.repo_full_name + ':' + imageTag.tag;
      }
    }

    // envs
    for (const env of envs) {
      const { key, value } = env;
      if (!key) continue;
      environment[key] = value;
    }

    // update
    const result = await this.ctx.service.cluster.updateApp(clusterId, appName, {
      environment,
      template,
      version: Date.now().toString(),
    });

    ctx.logger.info('#deploy.update', result);
    return result;
  }
}

module.exports = DeployService;
