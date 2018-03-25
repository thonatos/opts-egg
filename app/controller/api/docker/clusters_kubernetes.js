'use strict';

const Controller = require('egg').Controller;

class ClustersKubernetesController extends Controller {
  async index() {
    const { ctx } = this;
    const { query, options } = ctx.helper.formatPaginatedQuery(ctx.query);
    const clusters = await ctx.model.ClusterKubernetes.paginate(query,
      Object.assign(options, {
        select: 'name region version namespace',
      })
    );
    ctx.body = ctx.helper.formatMongoosePaginateData(clusters);
  }

  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    const cluster = new ctx.model.ClusterKubernetes(body);
    await cluster.save();
    ctx.body = cluster;
  }

  async update() {
    const { ctx } = this;
    const body = ctx.request.body;
    const cluster = await ctx.model.ClusterKubernetes.update({
      _id: ctx.params.id,
    }, body);
    ctx.body = cluster;
  }

  async destroy() {
    const { ctx } = this;
    const cluster = await ctx.model.ClusterKubernetes.remove({
      _id: ctx.params.id,
    });
    ctx.body = cluster;
  }

}

module.exports = ClustersKubernetesController;
