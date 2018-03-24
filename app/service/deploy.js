'use strict';

const Service = require('egg').Service;

class DeployService extends Service {
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
    const environment = {};

    // images
    for (const img of images) {
      const { key, image_id: _id } = img;
      const image = await ctx.model.Image.findOne({ _id });
      const imageTag = await ctx.model.ImageTag.findOne({ image: _id }, null, { sort: { created_at: -1 } });
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
        const status = await ctx.service.clusterKubernetes.updateDeployments(clusterId, appName, {
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

    if (platform === 'docker_swarm') {
      try {
        const status = await ctx.service.cluster.updateApp(clusterId, appName, {
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
