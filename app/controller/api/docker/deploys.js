'use strict';

const Controller = require('egg').Controller;

class DeploysController extends Controller {
  // gets
  async index() {
    const { ctx } = this;
    const { options } = ctx.helper.formatPaginatedQuery(ctx.query);
    const deploys = await ctx.model.Deploy.paginate({}, options);
    ctx.body = ctx.helper.formatMongoosePaginateData(deploys);
  }

  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    const cluster = new ctx.model.Deploy(body);
    await cluster.save();
    ctx.body = cluster;
  }

  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const body = ctx.request.body;
    const cluster = await ctx.model.Deploy.update({
      _id: id,
    }, body);
    ctx.body = cluster;
  }

  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    const cluster = await ctx.model.Deploy.remove({
      _id: id,
    });
    ctx.body = cluster;
  }
}

module.exports = DeploysController;
