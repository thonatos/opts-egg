'use strict';

const Service = require('egg').Service;

class ImageService extends Service {
  async list(limit, offset) {
    const { ctx } = this;
    const images = await ctx.model.Image.findAndCountAll({
      limit: limit && (limit > 100 ? 100 : limit) || 10,
      offset: offset || 0,
      include: [
        {
          model: this.ctx.model.ImageTag,
          as: 'tags',
        },
      ],
    });
    return images;
  }

  async getRepoFullName(condition = {}) {
    const image = await this.ctx.model.Image.findOne({
      where: condition,
      include: [
        {
          model: this.ctx.model.ImageTag,
          as: 'tags',
          order: [
            [ 'pushed_at', 'DESC' ],
          ],
          limit: 1,
        },
      ],
    });

    if (!image) {
      return null;
    }

    const { tags, repo_full_name } = image;
    const tag = (tags && tags.length > 0) ? tags[ 0 ].tag : 'lastest';
    return [ repo_full_name, tag ].join(':');
  }

  async create(body) {
    const { push_data, repository } = body;
    const { tag, digest, pushed_at } = push_data;
    const { namespace, region, name, repo_full_name } = repository;

    const imageData = { namespace, region, name, repo_full_name };
    const [ newImage ] = await this.ctx.model.Image.findOrCreate({
      where: imageData,
      defaults: imageData,
    });

    const imageTagData = { tag, digest, pushed_at, image_id: newImage.get('id') };
    const [ newImageTag ] = await this.ctx.model.ImageTag.findOrCreate({
      where: imageTagData,
      defaults: imageTagData,
    });

    return {
      image: newImage,
      tag: newImageTag,
    };
  }
}

module.exports = ImageService;
