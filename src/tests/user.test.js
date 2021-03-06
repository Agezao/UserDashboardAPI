import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../server';

chai.config.includeStack = true;

/**
 * root level hooks
 */

describe('## User Routes', () => {

  describe('# GET /users?id={user.id}', () => {
    it('should return the first user when passed ?id=1', function(done) {
      this.timeout(500);

      request(app)
        .get('/users?id=1')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.id).to.equal(1);

          done();
        })
        .catch(done);
    });

    it('should return error when passing wrong or null ?id={user.id}', function(done) {
      this.timeout(500);

      request(app)
        .get('/users?id=hello')
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .then((res) => {
          done();
        })
        .catch(done);
    });
  });
});
