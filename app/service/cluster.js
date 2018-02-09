'use strict';

const axios = require('axios');
const Service = require('egg').Service;

class ClusterService extends Service {

  async getProject(cluster) {
    const { ctx } = this;
    try {
      const { host } = cluster;
      const httpsAgent = ctx.helper.getHttpsAgent(cluster);
      const { data } = await axios.get(`${host}/projects/`, {
        httpsAgent,
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
      const { host } = cluster;
      const httpsAgent = ctx.helper.getHttpsAgent(cluster);
      const { status } = await axios.post(`${host}/projects/${name}/update`, params, {
        httpsAgent,
      });
      return status;
    } catch (error) {
      ctx.logger.error(error.response);
      ctx.throw(500, '#cluster: update failed');
    }
  }

}

module.exports = ClusterService;
