'use strict';

const Controller = require('egg').Controller;

class ImagesController extends Controller {
  // gets
  async index() {
    const { ctx } = this;
    const { query, options } = ctx.helper.formatPaginatedQuery(ctx.query);
    const images = await ctx.model.Image.paginate(query, options);
    ctx.body = ctx.helper.formatMongoosePaginateData(images);
  }

  async show() {
    const { ctx } = this;
    const { options } = ctx.helper.formatPaginatedQuery(ctx.query);
    const query = {
      image: ctx.params,
    };
    const tags = await ctx.model.ImageTag.paginate(query, options);
    ctx.body = ctx.helper.formatMongoosePaginateData(tags);
  }
}

module.exports = ImagesController;
