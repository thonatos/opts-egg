'use strict';

module.exports = ({ router, controller, io }) => {
  router.get('/', 'home.index');

  // api
  router.resources('docker/clusters', '/api/docker/clusters', controller.api.docker.clusters);
  router.resources('docker/images', '/api/docker/images', controller.api.docker.images);

  // webhook
  router.post('/hook/docker/aliyun', controller.hook.docker.aliyun.create);
  router.post('/hook/docker/harbor', controller.hook.docker.harbor.create);

  // auth
  router.post('/auth/jwt/sign', controller.auth.jwt.sign);

  // socket.io
  io.of('/docker').route('exchange', io.controller.docker.exchange);
};
