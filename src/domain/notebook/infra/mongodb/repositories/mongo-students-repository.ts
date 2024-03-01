import { Injectable } from '@nestjs/common'

import { Student } from '@/domain/notebook/enterprise/entities/student'
import { StudentsRepository } from '@/domain/notebook/application/repositories/students-repository'

import { MongoStudent } from '../schemas/mongo-students-schema'
import { MongoStudentMapper } from '../mappers/mongo-student-mapper'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { DATABASE } from '@/core/app/databases'

@Injectable()
export class MongoStudentsRepository implements StudentsRepository {
  constructor(
    @InjectModel('students', DATABASE.MAIN) private model: Model<MongoStudent>,
  ) {}

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.model.findOne({ email })

    if (!student) {
      return null
    }

    return MongoStudentMapper.toDomain(student)
  }

  async create({ name, email, password }: Student): Promise<void> {
    await this.model.create({ name, email, password })
  }
}
