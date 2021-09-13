const assert = require('assert');
const app = require('../../src/app');

describe('\'search-book\' service', () => {
  it('registered the service', () => {
    const service = app.service('search-book');

    assert.ok(service, 'Registered the service');
  });
});
