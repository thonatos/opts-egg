'use strict';

class DockerConnector {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async getImages(id, limit, offset) {
    const { ctx } = this;
    const images = await ctx.model.Image.paginate({}, {
      skip: parseInt(offset),
      limit: parseInt(limit) || 10,
    });
    return ctx.helper.formatMongoosePaginateData(images);
  }

  async getClusters(name) {
    const query = !name ? {} : {
      name,
    };
    return await this.ctx.model.Cluster.find(query);
  }
}

module.exports = DockerConnector;
