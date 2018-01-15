'use strict';

const Service = require('egg').Service;

class MemberService extends Service {
  async find(username, password) {
    const { ctx } = this;
    const member = await ctx.model.Mermber.findOne({
      where: {
        username,
        password,
      },
    });
    if (!member) return member;
    const { id, userrole } = member;
    return {
      id,
      userrole,
    };
  }
}

module.exports = MemberService;
