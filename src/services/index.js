import users from './users/users.service.js';
import book from './book/book.service.js';
import author from './author/author.service.js';
import bookIssue from './book-issue/book-issue.service.js';
import upload from './upload/upload.service.js';
import searchBook from './search-book/search-book.service.js';

// eslint-disable-next-line no-unused-vars
export default function (app) {
  app.configure(users);
  app.configure(book);
  app.configure(author);
  app.configure(bookIssue);
  app.configure(upload);
  app.configure(searchBook);
}
