import * as feathersAuthentication from '@feathersjs/authentication';
import ManageUpload from './hooks/ManageUpload';
const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      // set uploaded by from user._id,
      ctx => {
        const { params, data } = ctx;
        data.uploadedBy = params.user._id;
      },
      ManageUpload(),
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
