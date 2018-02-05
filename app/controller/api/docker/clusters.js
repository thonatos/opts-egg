'use strict';

const Controller = require('egg').Controller;

class ClustersController extends Controller {
  async index() {
    const { ctx } = this;
    const { limit, offset, s } = ctx.query;

    let query = {};
    let options = {};

    if (typeof s === 'undefined') {
      options = {
        select: '-ca -key -cert -host',
        skip: parseInt(offset) || 0,
        limit: parseInt(limit) || 10,
      };
    }

    if (s === '') {
      options = {
        select: '-ca -key -cert -host',
        limit: 1000,
      };
    }

    if (typeof s !== 'undefined' && s !== '') {
      query = {
        name: {
          $regex: s,
        },
      };
      options = {
        select: '-ca -key -cert -host',
        limit: 1000,
      };
    }

    const clusters = await ctx.model.Cluster.paginate(query, options);
    ctx.body = ctx.helper.formatMongoosePaginateData(clusters);
  }

  async show() {
    const { ctx } = this;
    const { id: _id } = ctx.params;
    const cluster = await ctx.model.Cluster.findOne({
      _id,
    });
    const data = await ctx.service.cluster.getProject(cluster);
    ctx.body = data;
  }

  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    const cluster = new ctx.model.Cluster(body);
    await cluster.save();
    ctx.body = cluster;
  }

  async update() {
    const { ctx } = this;
    const { id: _id } = ctx.params;
    const body = ctx.request.body;
    const cluster = await ctx.model.Cluster.update({
      _id,
    }, body);
    ctx.body = cluster;
  }

  async destroy() {
    const { ctx } = this;
    const { id: _id } = ctx.params;
    const cluster = await ctx.model.Cluster.remove({
      _id,
    });
    ctx.body = cluster;
  }
}

module.exports = ClustersController;
