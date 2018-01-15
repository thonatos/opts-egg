'use strict';

const Controller = require('egg').Controller;

/**
 * HomeController
 * @access public
 * @desc HomeController
 */
class HomeController extends Controller {
  async index() {
    this.ctx.body = 'console.egg';
  }
}

module.exports = HomeController;
