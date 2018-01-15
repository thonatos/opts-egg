'use strict';

const Service = require('egg').Service;

class DeployService extends Service {
  async show(id) {
    const deploy = await this.ctx.model.Deploy.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.ctx.model.DeployEnv,
          as: 'env',
        },
        {
          model: this.ctx.model.DeployImage,
          as: 'image',
        },
      ],
    });
    return deploy;
  }

  async update(id) {
    const deploy = await this.ctx.service.deploy.show(id);

    if (!deploy) {
      this.ctx.throw(500, 'not exist');
    }

    const { image: images, template, app: appName, cluster_id } = deploy;

    // environment
    const environment = {};
    for (const index in images) {
      const { key, image_id } = images[ index ];
      const repo_full_name = await this.ctx.service.image.getRepoFullName({
        id: image_id,
      });
      if (repo_full_name) {
        environment[ key ] = repo_full_name;
      }
    }

    const env = deploy.env;
    for (const index in env) {
      const { key, value } = env[ index ];
      if (key) {
        environment[ key ] = value;
      }
    }

    // update
    const result = await this.ctx.service.cluster.update(cluster_id, appName, {
      environment,
      template,
      version: Date.now().toString(),
    });

    console.log('#deploy.update', result);

    return result;
  }

}

module.exports = DeployService;
