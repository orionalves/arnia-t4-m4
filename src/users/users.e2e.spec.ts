import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './users.module';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { AuthGuard } from '../auth/auth.guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';
import { createUserMock } from '../testing/users/create-user.mock';
import { requestProfileMock } from '../testing/request/request-profile.mock';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(userRepositoryMock.provide)
      .useValue(userRepositoryMock.useValue)
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    app = moduleFixture.createNestApplication();

    app.use((req, res, next) => {
      Object.assign(req, requestProfileMock);
      next();
    });

    await app.init();
  });

  describe('Post -> Create User', () => {
    it('Should create a user and return', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserMock);

      expect(response.statusCode).toEqual(HttpStatus.CREATED);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('Get -> List all Users', () => {
    it('/users (GET)', () => {
      return request(app.getHttpServer()).get('/users').expect(200);
    });
  });

  describe('Get -> Return Profile of the current User', () => {
    it('/users/profile (GET)', async () => {
      const response = await request(app.getHttpServer()).get('/users/profile');

      expect(response.statusCode).toEqual(HttpStatus.OK);
    });
  });

  describe('Get -> Return a User', () => {
    it('/users/1 (GET)', async () => {
      const response = await request(app.getHttpServer()).get('/users/1');

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('isActive');
      expect(typeof response.body.isActive).toEqual('boolean');
    });
  });
});
