import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { UsersModule } from './users.module';
import {
  authGuardMock,
  createUserMock,
  usersRepositoryMock,
  usersServiceMock,
} from '../testing';
import { AuthGuard } from '../auth/auth.guard';

describe('Users Controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(usersRepositoryMock.provide)
      .useValue(usersRepositoryMock.useValue)
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('Should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('Create', () => {
    it('Post -> /users - OK', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserMock);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty('id');
    });

    it('Post -> /users - Bad Request', async () => {
      const { email, ...rest } = createUserMock;

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(rest);

      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Read', () => {
    it('Get -> /users/profile', async () => {
      const response = await request(app.getHttpServer()).get('/users/profile');

      expect(response.statusCode).toEqual(200);
    });
  });
});
