// Initializes the `book-issue` service on path `/book-issue`
import { BookIssue } from './book-issue.class';

import createModel from '../../models/book-issue.model';
import hooks from './book-issue.hooks';

export default function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$populate']
  };

  // Initialize our service with any options it requires
  app.use('/book-issue', new BookIssue(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('book-issue');

  service.hooks(hooks);
};
