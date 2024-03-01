import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { TestAppModule } from 'test/setup-e2e'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoUserModel } from '../../infra/mongodb/schemas/mongo-user-schema'
import { UserFactory } from 'test/factories/make-user'
import { hash } from 'bcryptjs'

import request from 'supertest'
import { DATABASE } from '@/core/app/databases'

describe('Register user (e2e)', () => {
  let app: INestApplication
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TestAppModule,
        MongooseModule.forFeature([MongoUserModel], DATABASE.HOMOLOG),
      ],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('should not be able to create a user if not exists', async () => {
    await userFactory.makeMongoUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 8),
    })

    const response = await request(app.getHttpServer())
      .post('/identity/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      })

    expect(response.statusCode).toBe(409)
  })
})
