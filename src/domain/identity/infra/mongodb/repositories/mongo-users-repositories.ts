import { Student } from '@/domain/notebook/enterprise/entities/student'
import { Injectable } from '@nestjs/common'
import { MongoUserMapper } from '../mappers/mongo-user-mapper'
import { MongoUser } from '../schemas/mongo-user-schema'
import { UsersRepository } from '@/domain/identity/application/repositories/users-repository'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { DATABASE } from '@/core/app/databases'

@Injectable()
export class MongoUsersRepository implements UsersRepository {
  constructor(
    @InjectModel('Identity_User', DATABASE.HOMOLOG)
    private model: Model<MongoUser>,
  ) {}

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.model.findOne({ email })

    if (!student) {
      return null
    }

    return MongoUserMapper.toDomain(student)
  }

  async create({ name, email, password }: Student): Promise<void> {
    await this.model.create({ name, email, password })
  }
}
