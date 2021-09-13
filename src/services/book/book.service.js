// Initializes the `book` service on path `/book`
import { Book } from './book.class';

import createModel from '../../models/book.model';
import hooks from './book.hooks';

export default function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$populate']
  };

  // Initialize our service with any options it requires
  app.use('/book', new Book(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('book');

  service.hooks(hooks);
};
