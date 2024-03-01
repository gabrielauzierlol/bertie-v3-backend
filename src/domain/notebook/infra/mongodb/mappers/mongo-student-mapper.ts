import { Student } from '@/domain/notebook/enterprise/entities/student'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MongooseDocument } from '@/core/types/mongo'
import { MongoStudent } from '../schemas/mongo-students-schema'

export class MongoStudentMapper {
  static toDomain(doc: MongooseDocument<MongoStudent>): Student {
    const raw = doc.toObject()

    return Student.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
      },
      new UniqueEntityID(doc?._id.toString()),
    )
  }
}
