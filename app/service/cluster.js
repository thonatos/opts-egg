'use strict';

const axios = require('axios');
const https = require('https');
const Service = require('egg').Service;

class ClusterService extends Service {

  async getProject(cluster) {
    const { ctx } = this;
    try {
      const { ca, key, cert, host } = cluster;
      const agent = new https.Agent({
        ca,
        key,
        cert,
      });
      const { data } = await axios.get(`${host}/projects/`, {
        httpsAgent: agent,
      });
      return data;
    } catch (error) {
      ctx.logger.error(error.response);
      ctx.throw(500, '#cluster: request info failed');
    }
  }

  // https://help.aliyun.com/document_detail/26072.html?spm=5176.product25972.6.890.70qDnV
  async updateApp(clusterId, name, params) {
    const { ctx } = this;
    const cluster = await ctx.model.Cluster.findOne({
      _id: clusterId,
    });

    try {
      const { ca, key, cert, host } = cluster;
      const agent = new https.Agent({
        ca,
        key,
        cert,
      });
      const { status } = await axios.post(`${host}/projects/${name}/update`, params, {
        httpsAgent: agent,
      });
      return status;
    } catch (error) {
      ctx.logger.error(error.response);
      ctx.throw(500, '#cluster: update failed');
    }
  }

}

module.exports = ClusterService;
