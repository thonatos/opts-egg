'use strict';

const yaml = require('js-yaml');
const nunjucks = require('nunjucks');
const Service = require('egg').Service;
const Client = require('kubernetes-client').Client;

class Cluster_kubernetesService extends Service {
  async updateDeployments(clusterId, deployment, { template, environment }) {
    const { ctx } = this;

    const cluster = await ctx.model.ClusterKubernetes.findOne({
      _id: clusterId,
    });
    const { host: url, namespace, version, ca, key, cert, user, pass } = cluster;

    ctx.logger.debug('cluster', cluster);

    const client = new Client({
      config: {
        url,
        auth: {
          user,
          pass,
        },
        ca,
        key,
        cert,
        namespace,
      },
      version,
    });

    const templateRaw = nunjucks.renderString(template, environment);
    const { spec } = yaml.safeLoad(templateRaw);
    ctx.logger.debug('spec', spec);

    try {
      const { statusCode, body } = await client.api.apps.v1beta1.namespaces(namespace).deployments(deployment).patch({
        body: {
          spec,
        },
      });
      ctx.logger.debug('statusCode', statusCode);
      ctx.logger.debug('body', body);

      return statusCode;
    } catch (error) {
      ctx.logger.error(error);
      ctx.throw(500, '#cluster: update failed');
    }
  }
}

module.exports = Cluster_kubernetesService;
