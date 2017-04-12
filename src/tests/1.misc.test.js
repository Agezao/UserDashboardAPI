import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../server';

chai.config.includeStack = true;

describe('## Misc', () => {

  describe('# GET /health-check', () => {

    it('should return OK', (done) => {
      
      request(app)
        .get('/health-check')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.text).to.equal('OK');
          done();
        })
        .catch(done);
    });
  });
});
