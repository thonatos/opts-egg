'use strict';

const Controller = require('egg').Controller;

/**
 * HomeController
 * @access public
 * @desc HomeController
 */
class HomeController extends Controller {
  async index() {
    this.ctx.body = `
      <div style="margin: 0 auto; padding: 1em 0; max-width: 960px;">
        <h2>(Dev)Opts</h2>
        <p style="font-size: 14px;">Powered By Egg.js</p>
      </div>
    `;
  }
}

module.exports = HomeController;
