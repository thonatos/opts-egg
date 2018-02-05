'use strict';

const Controller = require('egg').Controller;

class ImagesController extends Controller {
  // gets
  async index() {
    const { ctx } = this;
    const { limit, offset, s } = this.ctx.query;

    let query = {};
    let options = {};

    if (typeof s === 'undefined') {
      options = {
        skip: parseInt(offset) || 0,
        limit: parseInt(limit) || 10,
      };
    }

    if (s === '') {
      options = {
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
        limit: 1000,
      };
    }

    const images = await ctx.model.Image.paginate(query, options);
    ctx.body = ctx.helper.formatMongoosePaginateData(images);
  }
}

module.exports = ImagesController;
