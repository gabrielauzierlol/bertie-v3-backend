import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Student,
  StudentProps,
} from '@/domain/notebook/enterprise/entities/student'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { MongoUser } from '@/domain/identity/infra/mongodb/schemas/mongo-user-schema'
import { Model } from 'mongoose'

export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityID,
) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return student
}

@Injectable()
export class StudentFactory {
  constructor(@InjectModel(MongoUser.name) private model: Model<MongoUser>) {}

  async makeMongoStudent(data: Partial<StudentProps> = {}): Promise<Student> {
    const student = makeStudent(data)

    await this.model.create(data)

    return student
  }
}
