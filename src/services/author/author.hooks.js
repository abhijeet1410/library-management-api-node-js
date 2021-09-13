import RequiredForAuthor from './hooks/RequiredForAuthor';
import CheckIfAuthorAlreadyExists from './hooks/CheckIfAuthorAlreadyExists';
import {disallow} from 'feathers-hooks-common';
import CheckIfAdmin from '../../hooks/CheckIfAdmin';
import * as feathersAuthentication from '@feathersjs/authentication';
const { authenticate } = feathersAuthentication.hooks;


export default {
  before: {
    all: [
      authenticate('jwt')
    ],
    find: [
      ctx => {
        const { params, method } = ctx;
        // console.log('Params', params);
        console.log(method);
        params.query.status = 1;
        // params.query.status = {
        //   $in: [1, 5]
        // };
        // params.query.status = {
        //   $nin: [1, 5]
        // };
      }
    ],
    get: [],
    create: [
      CheckIfAdmin(),
      RequiredForAuthor(),
      CheckIfAuthorAlreadyExists()
    ],
    update: [disallow()],
    patch: [
      CheckIfAdmin(),
    ],
    remove: [
      CheckIfAdmin(),
      // ctx => {
      //   const { params, method } = ctx;
      //   console.log('Params', params);
      // }
    ]
  },

  after: {
    all: [],
    find: [
      // modify response in after hooks, booksCount in each object
    ],
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
