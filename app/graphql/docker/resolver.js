'use strict';

module.exports = {
  Docker: {
    images(_, { id, limit, offset }, ctx) {
      console.log(_);
      return ctx.connector.docker.getImages(id, limit, offset);
    },
    clusters(_, { name }, ctx) {
      return ctx.connector.docker.getClusters(name);
    },
  },
};
