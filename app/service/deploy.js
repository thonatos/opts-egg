'use strict';

const Service = require('egg').Service;

class DeployService extends Service {
  async update(deployId) {
    const { ctx } = this;

    const deploy = await ctx.model.Deploy.find({
      _id: deployId,
    });

    if (!deploy) {
      this.ctx.throw(500, 'not exist');
    }

    const { images, template, app: appName, cluster: cluster_id, envs } = deploy;

    // environment
    const environment = {};
    for (const index in images) {
      const { key, image_id } = images[index];

      const image = await ctx.module.Image.findOne({
        _id: image_id,
      });

      const image_tag = await ctx.model.ImageTag.findOne({
        _id: image_id,
      });

      if (image && image_tag) {
        environment[key] = image.repo_full_name + ':' + image_tag.tag;
      }
    }

    for (const index in envs) {
      const { key, value } = envs[index];
      if (key) {
        environment[key] = value;
      }
    }

    // update
    const result = await this.ctx.service.cluster.updateApp(cluster_id, appName, {
      environment,
      template,
      version: Date.now().toString(),
    });

    console.log('#deploy.update', result);

    return result;
  }

}

module.exports = DeployService;
