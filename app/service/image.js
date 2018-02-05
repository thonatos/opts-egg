'use strict';

const Service = require('egg').Service;

class ImageService extends Service {
  async create(body) {
    const { ctx } = this;
    const { push_data, repository } = body;
    const { pushed_at } = push_data;
    const { name, namespace, region } = repository;
    let image = await ctx.model.Image.findOne({
      name,
      namespace,
      region,
    });
    if (!image) {
      image = new ctx.model.Image(repository);
      await image.save();
    }

    const tag = new ctx.model.ImageTag(Object.assign(push_data, {
      image: image._id,
      pushed_at: new Date(pushed_at),
    }));
    await tag.save();

    return {
      image,
      tag,
    };
  }
}

module.exports = ImageService;
