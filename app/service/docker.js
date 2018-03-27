'use strict';

const axios = require('axios');
const Service = require('egg').Service;

class ClusterDockerService extends Service {

  async getProject(docker) {
    const { ctx } = this;
    try {
      const { host } = docker;
      const httpsAgent = ctx.helper.getHttpsAgent(docker);
      const { data } = await axios.get(`${host}/projects/`, {
        httpsAgent,
      });
      return data;
    } catch (error) {
      ctx.logger.error(error.response);
      ctx.throw(500, '#docker: request info failed');
    }
  }

  // https://help.aliyun.com/document_detail/26072.html?spm=5176.product25972.6.890.70qDnV
  async updateApp(clusterId, name, params) {
    const { ctx } = this;
    const docker = await ctx.model.Docker.findOne({
      _id: clusterId,
    });

    try {
      const { host } = docker;
      const httpsAgent = ctx.helper.getHttpsAgent(docker);
      const { status } = await axios.post(`${host}/projects/${name}/update`, params, {
        httpsAgent,
      });
      return status;
    } catch (error) {
      ctx.logger.error(error.response);
      ctx.throw(500, '#docker: update failed');
    }
  }

}

module.exports = ClusterDockerService;
