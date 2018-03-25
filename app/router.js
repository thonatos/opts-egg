'use strict';

module.exports = ({ router, controller, middleware }) => {
  router.get('/', 'home.index');

  // api
  router.resources('docker/clusters', '/api/docker/clusters', controller.api.docker.clusters);
  router.resources('docker/clusters_kubernetes', '/api/docker/clusters_kubernetes', controller.api.docker.clustersKubernetes);
  router.resources('docker/deploys', '/api/docker/deploys', controller.api.docker.deploys);
  router.resources('docker/images', '/api/docker/images', controller.api.docker.images);

  // auth
  router.post('/auth/jwt/sign', controller.auth.jwt.sign);

  // webhook
  const aliyun = middleware.formatter('aliyun');
  const harbor = middleware.formatter('harbor');
  const docker = middleware.formatter('docker');
  router.post('/hook/docker/aliyun', aliyun, controller.hook.docker.handle);
  router.post('/hook/docker/harbor', harbor, controller.hook.docker.handle);
  router.post('/hook/docker/docker', docker, controller.hook.docker.handle);

};
