import { UniqueEntityID } from '@/core/domain/entities/unique-entity-id'
import { MongooseDocument } from '@/core/types/mongo'
import { MongoUser } from '../schemas/mongo-user-schema'

import { User } from '@/bertie/identity/enterprise/entities/user'

export class MongoUserMapper {
  static toDomain(doc: MongooseDocument<MongoUser>): User {
    const raw = doc.toObject()

    return User.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
      },
      new UniqueEntityID(doc?._id.toString()),
    )
  }
}
