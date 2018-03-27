'use strict';

const Service = require('egg').Service;

class DeployService extends Service {

  async getImages(images = []) {
    const { ctx } = this;
    const environment = {};
    for (const { key, image_id: _id } of images) {
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

    if (!enabled) {
      return {
        code: 404,
        message: 'deploy has been disabled.',
      };
    }

    // environment
    const _envs = await this.getEnvs(envs);
    const _images = await this.getImages(images);
    const environment = Object.assign({}, _images, _envs);

    ctx.logger.debug('platform', platform);

    // update
    if (platform === '') {
      return {
        code: 500,
        message: 'platform is required.',
      };
    }

    if (platform === 'kubernetes') {
      try {
        const status = await ctx.service.kubernetes.updateDeployments(clusterId, appName, {
          environment,
          template,
        });

        return {
          code: status,
        };
      } catch (error) {
        return {
          code: 500,
          message: 'service update error.',
        };
      }
    }

    if (platform === 'docker') {
      try {
        const status = await ctx.service.docker.updateApp(clusterId, appName, {
          environment,
          template,
          version: Date.now().toString(),
        });

        return {
          code: status,
        };
      } catch (error) {
        return {
          code: 500,
          message: 'service update error.',
        };
      }
    }
  }

  async trigger(triggerId = '') {
    const { ctx } = this;
    const deploys = await ctx.model.Deploy.find({
      'trigger.image_id': triggerId,
    });

    if (deploys.length === 0) {
      return {
        message: 'deploy not exist.',
      };
    }

    const results = [];

    for (const deploy of deploys) {
      const result = await this.update(deploy);
      results.push(result);
    }

    return results;
  }
}

module.exports = DeployService;
