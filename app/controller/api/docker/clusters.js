'use strict';

const Controller = require('egg').Controller;

class ClustersController extends Controller {
  // gets
  async index() {
    const clusters = await this.ctx.model.Cluster.findAll({
      attributes: [ 'id', 'name', 'region', 'created_at' ],
    });
    this.ctx.body = clusters;
  }

  // get
  async show() {
    const { id } = this.ctx.params;
    const cluster = await this.ctx.service.cluster.find(id);
    this.ctx.body = cluster;
  }

  // async create() { }
  // async destroy() { }
  // async update() { }
}

module.exports = ClustersController;
