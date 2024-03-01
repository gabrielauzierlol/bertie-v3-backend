import { INestApplication } from '@nestjs/common'
import { StudentFactory } from 'test/factories/make-student'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/core/app/app.module'
import { DatabaseModule } from '../../mongodb/database.module'
import { hash } from 'bcryptjs'

import request from 'supertest'
import { MongoModule } from '@/domain/common/infra/database/mongodb/mongo.module'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, MongoModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    await studentFactory.makeMongoStudent({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
