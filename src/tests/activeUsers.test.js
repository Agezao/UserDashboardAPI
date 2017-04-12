import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../server';

chai.config.includeStack = true;

/**
 * root level hooks
 */

describe('## TopActiveUsers Routes', () => {

  describe('# GET /topActiveUsers?page={pageNumber}', () => {

    it('should return entries or null message when ?page=1', function(done) {
      this.timeout(500);

      request(app)
        .get('/topActiveUsers?page=1')
        .expect(httpStatus.OK)
        .then((res) => {

          done();
        })
        .catch(done);
    });

    it('should return null message when ?page=9999', function(done) {
      this.timeout(500);

      request(app)
        .get('/topActiveUsers?page=9999')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.code).to.equal(-1);

          done();
        })
        .catch(done);
    });
  });
});
