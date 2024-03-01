import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { DATABASE } from '@/core/app/databases'
import { UsersRepository } from '@/domain/identity/application/repositories/users-repository'
import { User } from '@/domain/identity/enterprise/entities/user'

import { MongoUserMapper } from '../mappers/mongo-user-mapper'
import { MongoUser, MongoUserModel } from '../schemas/mongo-user-schema'

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
