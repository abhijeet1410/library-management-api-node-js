// Initializes the `author` service on path `/author`
import { Author } from './author.class';

import createModel from '../../models/author.model';
import hooks from './author.hooks';

export default function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use('/author', new Author(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('author');

  service.hooks(hooks);
};
