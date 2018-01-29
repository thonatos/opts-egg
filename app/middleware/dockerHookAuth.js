'use strict';

module.exports = () => {
  return async function(ctx, next) {
    const accessToken = ctx.get('X-AccessToken') || ctx.query.accessToken || null;
    const hook = await ctx.model.Hook.findOne({
      accessToken,
    });
    if (!hook) {
      ctx.throw(403, '#hook: auth failed');
      return;
    }
    ctx.hook = hook;
    await next();
  };
};
