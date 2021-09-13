/* eslint-disable no-unused-vars */
import {BadRequest} from '@feathersjs/errors';

export const SearchBook = class SearchBook {
  constructor (options, app) {
    this.options = options || {};
    this.app = app;
  }

  async find (params) {
    const { query } = params;
    let { search } = query;
    if (search) {
      const authors = await this.app.service('author')._find({
        query: {
          status: 1,
          name: RegExp(search, 'i'),
          $select: ['_id'],
        },
        paginate: false,
      }).then(res => res.map(e => e._id));
      query.$or = [
        {
          author: {
            $in: authors,
          },
        },
        {
          name: RegExp(search, 'i'),
        }
      ];
      delete query.search;
      return await this.app.service('book')._find({
        query
      });
    } else {
      throw new BadRequest('Search parameter is required.');
    }
  }
};
