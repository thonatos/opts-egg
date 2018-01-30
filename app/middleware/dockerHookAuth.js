'use strict';

module.exports = () => {
  return async function(ctx, next) {
    const accessToken = ctx.get('X-AccessToken') || ctx.query.accessToken || null;
    const notifications = ctx.app.config.notifications;
    const hook = notifications[accessToken] || null;
    if (!hook) {
      ctx.throw(403, '#hook: auth failed');
      return;
    }
    ctx.hook = hook;
    await next();
  };
};
