'use strict';

const Controller = require('egg').Controller;

class KubernetesController extends Controller {
  async index() {
    const { ctx } = this;
    const { query, options } = ctx.helper.serializeQuery(ctx.query);
    const kubernetesArray = await ctx.model.Kubernetes.paginate(query,
      Object.assign(options, {
        select: 'name region version namespace',
      })
    );
    ctx.body = ctx.helper.serializeResponse(kubernetesArray);
  }

  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    const kubernetes = new ctx.model.Kubernetes(body);
    await kubernetes.save();
    ctx.body = kubernetes;
  }

  async update() {
    const { ctx } = this;
    const body = ctx.request.body;
    const kubernetes = await ctx.model.Kubernetes.update({
      _id: ctx.params.id,
    }, body);
    ctx.body = kubernetes;
  }

  async destroy() {
    const { ctx } = this;
    const response = await ctx.model.Kubernetes.remove({
      _id: ctx.params.id,
    });
    ctx.body = response;
  }

}

module.exports = KubernetesController;
