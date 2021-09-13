import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import CheckUserIfAdmin from '../users/hooks/CheckUserIfAdmin';
import CheckIfAdmin from '../../hooks/CheckIfAdmin';


const { authenticate } = feathersAuthentication.hooks;
const { protect, hashPassword } = local.hooks;


export default {
  before: {
    all: [],
    find: [ authenticate('jwt'),
      // iff(isProvider('external'), ctx => {
      //   const { params, method } = ctx;
      //   console.log('Params', params);
      //   console.log('Params', params.user._id);
      // })
    ],
    get: [ authenticate('jwt') ],
    create: [ CheckUserIfAdmin(), hashPassword('password') ],
    update: [ hashPassword('password'),  authenticate('jwt') ],
    patch: [ hashPassword('password'),  authenticate('jwt') ],
    remove: [ authenticate('jwt'), CheckIfAdmin() ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
