'use strict';

const aliyun = data => {
  return [
    data,
  ];
};

const harbor = ({ events }, region = 'default') => {
  return events.map(event => {
    const { target, action, timestamp } = event;
    const { repository, digest, tag } = target;

    if (action !== 'push' || tag === undefined) {
      return null;
    }

    const [
      namespace,
      name,
    ] = repository.split('/');
    return {
      push_data: {
        tag,
        digest,
        pushed_at: timestamp,
      },
      repository: {
        namespace,
        name,
        region,
        repo_full_name: repository,
      },
    };
  });
};

const docker = ({ push_data, repository, region = 'default' }) => {
  const { tag, images } = push_data;
  const { namespace, name, repo_name: repo_full_name } = repository;
  return [
    {
      push_data: {
        tag,
        digest: images[0],
        pushed_at: new Date(),
      },
      repository: {
        name,
        region,
        namespace,
        repo_full_name,
      },
    },
  ];
};

const formatters = {
  docker,
  aliyun,
  harbor,
};

module.exports = type => {
  return async function format(ctx, next) {
    const body = ctx.request.body;
    ctx.events = formatters[type](body);
    await next();
  };
};
