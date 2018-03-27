'use strict';

const Controller = require('egg').Controller;

class ImagesController extends Controller {
  // gets
  async index() {
    const { ctx } = this;
    const { query, options } = ctx.helper.serializeQuery(ctx.query);
    const images = await ctx.model.Image.paginate(query, options);
    ctx.body = ctx.helper.serializeResponse(images);
  }

  async show() {
    const { ctx } = this;
    const { options } = ctx.helper.serializeQuery(ctx.query);
    const query = {
      image: ctx.params.id,
    };
    const tags = await ctx.model.ImageTag.paginate(query, options);
    ctx.body = ctx.helper.serializeResponse(tags);
  }
}

module.exports = ImagesController;
