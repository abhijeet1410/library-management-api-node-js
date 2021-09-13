import CheckIfAdmin from '../../hooks/CheckIfAdmin';
import {BadRequest} from '@feathersjs/errors';
import * as feathersAuthentication from '@feathersjs/authentication';
const { authenticate } = feathersAuthentication.hooks;


export default {
  before: {
    all: [
      authenticate('jwt')
    ],
    find: [

    ],
    get: [
      ctx => {
        ctx.params.query.$populate= ['author'];
        return ctx;
      }
    ],
    create: [
      CheckIfAdmin(),
      ctx => {
        const { data } = ctx;

        const { name, price, author } = data;

        if (!name) throw new BadRequest('Name is required.');
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
