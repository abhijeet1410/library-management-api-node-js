// Initializes the `search-book` service on path `/search-book`
import { SearchBook } from './search-book.class';

import hooks from './search-book.hooks';

export default function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/search-book', new SearchBook(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('search-book');

  service.hooks(hooks);
};
