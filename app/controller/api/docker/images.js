'use strict';

const Controller = require('egg').Controller;

class ImagesController extends Controller {
  // gets
  async index() {
    const { limit, offset } = this.ctx.query;
    const images = await this.ctx.service.image.list(parseInt(limit), parseInt(offset));
    this.ctx.body = images;
  }

  // async create() { }
  // async destroy() { }
  // async update() { }
}

module.exports = ImagesController;
