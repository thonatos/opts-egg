'use strict';

module.exports = ({ router, controller, middleware }) => {
  router.get('/', 'home.index');

  // api
  router.resources('container/docker', '/api/container/docker', controller.api.container.docker);
  router.resources('container/kubernetes', '/api/container/kubernetes', controller.api.container.kubernetes);
  router.resources('container/images', '/api/container/images', controller.api.container.images);
  router.resources('container/deploys', '/api/container/deploys', controller.api.container.deploys);

  // auth
  router.post('/auth/jwt/sign', controller.auth.jwt.sign);

  // webhook
  const aliyun = middleware.formatter('aliyun');
  const harbor = middleware.formatter('harbor');
  const docker = middleware.formatter('docker');
  router.post('/webhook/registry/aliyun', aliyun, controller.webhook.registry.handle);
  router.post('/webhook/registry/harbor', harbor, controller.webhook.registry.handle);
  router.post('/webhook/registry/docker', docker, controller.webhook.registry.handle);

};
