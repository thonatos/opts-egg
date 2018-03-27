'use strict';

const https = require('https');

const serializeResponse = response => {
  const { total, limit, docs: data } = response;
  const meta = {
    total,
    limit,
  };

  response.page && (meta.page = response.page);
  response.pages && (meta.pages = response.pages);
  response.offset && (meta.offset = response.offset);

  return {
    meta,
    data,
  };
};

const serializeQuery = ({ limit, page, s }, opt = {}) => {
  const searchKey = opt.searchKey || 'name';
  let query = {};
  let options = {};

  if (typeof s === 'undefined') {
    options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    };
  }

  if (s === '') {
    options = {
      limit: 1000,
    };
  }

  if (typeof s !== 'undefined' && s !== '') {
    query = {
      [searchKey]: {
        $regex: s,
      },
    };
    options = {
      limit: 1000,
    };
  }

  return {
    query,
    options,
  };
};

const getHttpsAgent = ({ ca, key, cert }) => {
  if (!ca || !key || !cert) {
    return null;
  }

  const agent = new https.Agent({
    ca,
    key,
    cert,
  });
  return agent;
};

module.exports = {
  getHttpsAgent,
  serializeQuery,
  serializeResponse,
};
