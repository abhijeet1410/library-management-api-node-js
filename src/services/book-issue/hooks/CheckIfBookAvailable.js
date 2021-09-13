import {BadRequest} from '@feathersjs/errors';

export const CheckIfBookAvailable = () => async context => {
  const { data , app } = context;
  let bookId = data.book;
  const bookData = await app.service('book')._get(bookId, {
    query: {
      status: 1,
    }
  }).catch((e) => {
    throw new BadRequest(e.message);
  });

  const { availableUnits } = bookData;

  if (availableUnits === 0) {
    throw new BadRequest('No units available for this book.');
  }
};
