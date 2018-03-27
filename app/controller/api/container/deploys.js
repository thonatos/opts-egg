'use strict';

const Controller = require('egg').Controller;

class DeploysController extends Controller {
  // gets
  async index() {
    const { ctx } = this;
    const { options } = ctx.helper.serializeQuery(ctx.query);
    const deploys = await ctx.model.Deploy.paginate({}, options);
    ctx.body = ctx.helper.serializeResponse(deploys);
  }

  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    const deploy = new ctx.model.Deploy(body);
    await deploy.save();
    ctx.body = deploy;
  }

  async update() {
    const { ctx } = this;
    const body = ctx.request.body;
    const deploy = await ctx.model.Deploy.update({
      _id: ctx.params.id,
    }, body);
    ctx.body = deploy;
  }

  async destroy() {
    const { ctx } = this;
    const response = await ctx.model.Deploy.remove({
      _id: ctx.params.id,
    });
    ctx.body = response;
  }
}

module.exports = DeploysController;
