import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { Academy } from '../src/academies/models/academy.model';

const checkAcademy = academy => {
  expect(academy).toMatchObject({
    id: expect.any(String),
    abbreviation: expect.any(String),
    endpoint: expect.any(String),
    website: expect.any(String),
    alias: expect.any(String),
    name: expect.any(String),
  });
  expect(academy.id).toBeTruthy();
  expect(academy.alias).toBeTruthy();
  expect(academy.website).toBeTruthy();
  expect(academy.endpoint).toBeTruthy();
  expect(academy.version).toBeFalsy();
};

describe('Academies (e2e)', () => {
  let app;
  let academies: Academy[];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await moduleFixture.createNestApplication(new FastifyAdapter());
    await app.init();
    await app
      .getHttpAdapter()
      .getInstance()
      .ready();
  });

  it('Получение списка вузов', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        variables: {},
        query: print(gql`
          query {
            academies {
              id
              name
              abbreviation
              alias
              endpoint
              website
            }
          }
        `),
      })
      .expect(200)
      .expect(({ body }) => {
        academies = body.data.academies;
        expect(academies).toBeTruthy();
        academies.forEach(checkAcademy);
      });
  });

  it('Получение вуза по id', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        variables: {
          id: academies[0].id,
        },
        query: print(gql`
          query getAcademy($id: String!) {
            academy(id: $id) {
              id
              name
              abbreviation
              alias
              endpoint
              website
            }
          }
        `),
      })
      .expect(200)
      .expect(({ body }) => {
        const academy = body.data.academy;
        expect(academy).toBeTruthy();
        checkAcademy(academy);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
