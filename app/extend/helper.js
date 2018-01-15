'use strict';

module.exports = {
  parseMsg(action, payload, metadata = {}) {
    const meta = Object.assign({}, {
      timestamp: Date.now(),
    }, metadata);

    return {
      data: {
        action,
        payload,
      },
      meta,
    };
  },

  formatDockerRegistyEvents({ events }, region = 'default') {
    return events.map(event => {
      const { target, action, timestamp } = event;
      const { repository, digest, tag } = target;

      if (action !== 'push' || tag === undefined) {
        return null;
      }

      const [ namespace, name ] = repository.split('/');
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
  },
};