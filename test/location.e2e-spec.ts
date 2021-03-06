import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { isValid } from 'shortid';
import { CreateLocationInput } from '../src/components/location/location.dto';
import { generate } from 'shortid';

describe('Location e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('create location', async () => {
    const locName = 'firstLocation' + generate();

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `
        mutation {
          createLocation (input: { location: { name: "${locName}" } }){
            location{
            id
            name
            }
          }
        }
        `,
      })
      .expect(({ body }) => {
        const locId = body.data.createLocation.location.id;
        expect(isValid(locId)).toBe(true);
        expect(body.data.createLocation.location.name).toBe(locName);
      })
      .expect(200);
  });

  it('read one location by id', async () => {
    const newLoc = 'locNameLocTest1' + generate();

    // create loc first
    let locId;
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `
        mutation {
          createLocation (input: { location: { name: "${newLoc}" } }){
            location{
            id
            name
            }
          }
        }
        `,
      })
      .expect(({ body }) => {
        locId = body.data.createLocation.location.id;
      })
      .expect(200);

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `
        query {
          readLocation ( input: { location: { id: "${locId}" } }){
            location{
            id
            name
            }
          }
        }
        `,
      })
      .expect(({ body }) => {
        expect(body.data.readLocation.location.id).toBe(locId);
        expect(body.data.readLocation.location.name).toBe(newLoc);
      })
      .expect(200);
  });

  it('update location', async () => {
    const newLoc = 'locNameForUpdateLocTest1' + generate();

    let locId;
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `
        mutation {
          createLocation (input: { location: { name: "oldLoc" } }){
            location{
            id
            name
            }
          }
        }
        `,
      })
      .expect(({ body }) => {
        locId = body.data.createLocation.location.id;
      })
      .expect(200);

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `
        mutation {
          updateLocation (input: { location: {id: "${locId}", name: "${newLoc}" } }){
            location {
            id
            name
            }
          }
        }
        `,
      })
      .expect(({ body }) => {
        expect(body.data.updateLocation.location.id).toBe(locId);
        expect(body.data.updateLocation.location.name).toBe(newLoc);
      })
      .expect(200);
  });

  it('delete location', async () => {
    const newLoc = 'locNameForDeleteLocTest1' + generate();

    let locId;
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `
        mutation {
          createLocation (input: { location: { name: "${newLoc}" } }){
            location{
            id
            name
            }
          }
        }
        `,
      })
      .expect(({ body }) => {
        locId = body.data.createLocation.location.id;
      })
      .expect(200);

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `
        mutation {
          deleteLocation (input: { location: { id: "${locId}" } }){
            location {
            id
            }
          }
        }
        `,
      })
      .expect(({ body }) => {
        expect(body.data.deleteLocation.location.id).toBe(locId);
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
