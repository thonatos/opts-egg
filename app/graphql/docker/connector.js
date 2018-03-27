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
    return ctx.helper.serializeResponse(images);
  }

  async getClusters(name) {
    const query = !name ? {} : {
      name,
    };
    return await this.ctx.model.Docker.find(query);
  }
}

module.exports = DockerConnector;
