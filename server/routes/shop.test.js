import server from '../../tests/mocks/server'
import { __RewireAPI__ } from './shop';

describe('route /shop', () => {
  it('should handle body-less request', () => {
    const resp = await server.request('/shop');
    resp.error.should.match('Need a POST body');
    resp.should.have.property('error');
    resp.should.deep.equal({ error: 'Need a POST body' })
  });
  it('should handle DB create error', () => {
    __RewireAPI__('InfoDB', { create: () => Promise.reject(new Error('error')) });
    const resp = await server.request('/shop', { shop: 'name' });
    resp.should.deep.equal({ error: 'Need a POST body' });
  });
});
