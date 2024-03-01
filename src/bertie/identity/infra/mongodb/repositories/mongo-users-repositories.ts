import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { DATABASE } from '@/core/application/databases'
import { MongoUserMapper } from '../mappers/mongo-user-mapper'
import { MongoUser, MongoUserModel } from '../schemas/mongo-user-schema'

import { UsersRepository } from '@/bertie/identity/application/repositories/users-repository'
import { User } from '@/bertie/identity/enterprise/entities/user'

@Injectable()
export class MongoUsersRepository implements UsersRepository {
  constructor(
    @InjectModel(MongoUserModel.name, DATABASE.BERTIE)
    private model: Model<MongoUser>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ email })

    if (!user) {
      return null
    }

    return MongoUserMapper.toDomain(user)
  }

  async create({ name, email, password }: User): Promise<void> {
    await this.model.create({ name, email, password })
  }
}
