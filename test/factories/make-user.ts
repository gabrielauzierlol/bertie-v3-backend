import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { MongoUser } from '@/domain/identity/infra/mongodb/schemas/mongo-user-schema'
import { Model } from 'mongoose'
import { User, UserProps } from '@/domain/identity/enterprise/entities/user'
import { DATABASE } from '@/core/app/databases'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return user
}

@Injectable()
export class UserFactory {
  constructor(
    @InjectModel('Identity_User', DATABASE.HOMOLOG)
    private model: Model<MongoUser>,
  ) {}

  async makeMongoUser(data: Partial<UserProps> = {}): Promise<User> {
    const user = makeUser(data)

    await this.model.create(data)

    return user
  }
}
