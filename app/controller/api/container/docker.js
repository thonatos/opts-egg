'use strict';

const Controller = require('egg').Controller;

class DockerController extends Controller {
  async index() {
    const { ctx } = this;
    const { query, options } = ctx.helper.serializeQuery(ctx.query);
    const dockerArray = await ctx.model.Docker.paginate(query,
      Object.assign(options, {
        select: '-ca -key -cert -host',
      })
    );
    ctx.body = ctx.helper.serializeResponse(dockerArray);
  }

  async show() {
    const { ctx } = this;
    const docker = await ctx.model.Docker.findOne({
      _id: ctx.params.id,
    });
    const data = await ctx.service.docker.getProject(docker);
    ctx.body = data;
  }

  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    const docker = new ctx.model.Docker(body);
    await docker.save();
    ctx.body = docker;
  }

  async update() {
    const { ctx } = this;
    const body = ctx.request.body;
    const docker = await ctx.model.Docker.update({
      _id: ctx.params.id,
    }, body);
    ctx.body = docker;
  }

  async destroy() {
    const { ctx } = this;
    const response = await ctx.model.Docker.remove({
      _id: ctx.params.id,
    });
    ctx.body = response;
  }
}

module.exports = DockerController;
