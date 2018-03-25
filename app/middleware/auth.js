'use strict';

module.exports = () => {
  return async function(ctx, next) {
    const xAccessToken = ctx.get('X-AccessToken') || ctx.query.accessToken || null;
    const { accessToken } = ctx.app.config.maidops;
    if (accessToken !== xAccessToken) {
      ctx.throw(403, '#hook: auth failed');
      return;
    }
    await next();
  };
};
