'use strict';

const axios = require('axios');
const https = require('https');
const Service = require('egg').Service;

class ClusterService extends Service {
  async find(id) {
    const cluster = await this.ctx.model.Cluster.findOne({
      where: {
        id,
      },
    });

    if (!cluster) {
      this.ctx.throw(501, '#cluster: not exist');
    }

    try {
      const { ca, key, cert, masterUrl } = cluster;
      const agent = new https.Agent({
        ca,
        key,
        cert,
      });
      const { data } = await axios.get(`${masterUrl}/projects/`, {
        httpsAgent: agent,
      });
      return data;
    } catch (error) {
      this.ctx.throw(500, '#cluster: request info failed');
    }
  }

  // https://help.aliyun.com/document_detail/26072.html?spm=5176.product25972.6.890.70qDnV
  async update(id, name, params) {
    const cluster = await this.ctx.model.Cluster.findOne({
      where: {
        id,
      },
    });

    if (!cluster) {
      this.ctx.throw(501, '#cluster: not exist');
    }

    try {
      const { ca, key, cert, masterUrl } = cluster;
      const agent = new https.Agent({
        ca,
        key,
        cert,
      });
      const { status } = await axios.post(`${masterUrl}/projects/${name}/update`, params, {
        httpsAgent: agent,
      });
      return status;
    } catch (error) {
      console.log(error.response);
      this.ctx.throw(500, '#cluster: update failed');
    }
  }

}

module.exports = ClusterService;
