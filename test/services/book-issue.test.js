const assert = require('assert');
const app = require('../../src/app');

describe('\'book-issue\' service', () => {
  it('registered the service', () => {
    const service = app.service('book-issue');

    assert.ok(service, 'Registered the service');
  });
});
