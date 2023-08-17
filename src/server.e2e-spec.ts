import request from 'supertest';

import application from './server';

describe('Server', () => {
  describe('/exchange (GET)', () => {
    const route = '/exchange';

    it('Should return bad request becuz missing query string', async () => {
      const response = await request(application)
        .get(route);
      expect(response.statusCode).toBe(400);
      expect(response.body.msg).toBe('syntax_error');
      expect(response.body.description).toBe('Incorrect source or target currency: undefined / undefined');
    });

    it('Should return bad request becuz incorrect currency format', async () => {
      const response = await request(application)
        .get(`${route}?source=YY&target=XX&amount=5`);
      expect(response.statusCode).toBe(400);
      expect(response.body.msg).toBe('syntax_error');
      expect(response.body.description).toBe('Incorrect source or target currency: YY / XX');
    });

    it('Should return bad request becuz incorrect amount format', async () => {
      const response = await request(application)
        .get(`${route}?source=JPY&target=TWD&amount=xxx`);
      expect(response.statusCode).toBe(400);
      expect(response.body.msg).toBe('syntax_error');
      expect(response.body.description).toBe('String \"xxx\" is no valid number');
    });

    it('Should return correct exchanged amount', async () => {
      const response = await request(application)
        .get(`${route}?source=JPY&target=USD&amount=$512200.0889`);
      expect(response.statusCode).toBe(200);
      expect(response.body.msg).toBe('success');
      expect(response.body.amount).toBe('$4,532.97');
    });
  });

  describe('Default 404', () => {
    it('Should return 404', async () => {
      const route = '/not-exists-route';
      const response = await request(application)
        .get(route);
      expect(response.statusCode).toBe(404);
    });
  })
})
