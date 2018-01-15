'use strict';

class DockerConnector {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async getImages(id, limit, offset) {
    return await this.ctx.model.Image.findAll({
      limit: limit && (limit > 100 ? 100 : limit) || 10,
      offset: offset || 0,
      where: !id ? {} : { id },
      include: [
        {
          model: this.ctx.model.ImageTag,
          as: 'tags',
        },
      ],
    });
  }

  async getClusters(name) {
    return await this.ctx.model.Cluster.findAll({
      where: !name ? {} : {
        name,
      },
    });
  }
}

module.exports = DockerConnector;
