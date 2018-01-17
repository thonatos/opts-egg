'use strict';

const Controller = require('egg').Controller;

class DeploysController extends Controller {
  // gets
  async index() {
    const { limit, offset } = this.ctx.query;
    const deploys = await this.ctx.service.deploy.list(parseInt(limit), parseInt(offset));
    this.ctx.body = deploys;
  }
}

module.exports = DeploysController;
