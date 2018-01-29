'use strict';

const Controller = require('egg').Controller;

class ImagesController extends Controller {
  // gets
  async index() {
    const { ctx } = this;
    const { limit, offset } = this.ctx.query;
    const images = await ctx.model.Image.paginate({}, {
      skip: parseInt(offset),
      limit: parseInt(limit) || 10,
    });
    ctx.body = ctx.helper.formatMongoosePaginateData(images);
  }
}

module.exports = ImagesController;
