'use strict';

const Controller = require('egg').Controller;

const options = {
  expiresIn: '2h',
};

class JwtController extends Controller {
  async sign() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;

    // find user
    const user = await ctx.model.Member.findOne({
      username,
    });

    if (!user) {
      ctx.throw(403, 'auth faild');
    }

    if (!user.validPassword(password)) {
      ctx.throw(403, 'auth faild');
    }

    // sign token
    const { id, userrole } = user;
    const payload = {
      id,
      username,
      userrole,
    };

    const token = app.jwt.sign(
      payload,
      app.config.jwt.secret,
      options
    );

    ctx.body = {
      token,
      info: {
        username,
        userrole,
      },
    };
  }
}

module.exports = JwtController;
