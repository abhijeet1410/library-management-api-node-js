import * as feathersAuthentication from '@feathersjs/authentication';
const { authenticate } = feathersAuthentication.hooks;
import {disallow, keep} from 'feathers-hooks-common';
import CheckIfUser from '../../hooks/CheckIfUser';
import {CheckIfBookAvailable} from './hooks/CheckIfBookAvailable';
import CheckIfAdmin from '../../hooks/CheckIfAdmin';

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      async ctx => {
        const { params } = ctx;
        const { query, user } = params;

        if (user.role === 1) {
          query.issuedBy = user._id;
        }
      }
    ],
    get: [],
    create: [
      // check if user or not.
      CheckIfUser(),
      // check book is present in our system and book is available in our stock
      // get book details
      // check status 1 and availableUnits > 0 otherwise error
      CheckIfBookAvailable(),
      // issuedBy = ctx.params.user._id
      ctx => {
        const { data, params } = ctx;
        data.issuedBy = params.user._id;
      },
    ],
    update: [disallow()],
    patch: [
      keep('status', 'cancellationReason'), //
      CheckIfAdmin()
      // Get issue details from id(context.id).
      // status 0 - check previous status 1 or 2, cancelledOn = new Date(), if admin give cancellationReason
      // status 2 - check admin or not, check previous status 1 or not, acceptedOn = new Date(),
      // status 3 - check admin or not, check previous status 2 or not, issuedOn = new Date(),
      // status 4 - check admin or not, check previous status 3 or not, returnedOn = new Date()
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      // status 3 - update availableUnits of book -1
      // status 4 - update availableUnits of book +1
      async ctx => {
        const { result, app } = ctx;
        const { book, status } = result;
        let bookId;
        if (book.name) {
          bookId = book._id;
        } else {
          bookId = book;
        }
        await app.service('book')._patch(bookId, {
          $inc: {
            availableUnits: status === 3 ? -1 : 1
          }
        });
      }
    ],
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
