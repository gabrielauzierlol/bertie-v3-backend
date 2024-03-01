import { DomainEvents } from '@/core/events/domain-events'

import { Student } from '@/domain/notebook/enterprise/entities/student'
import { StudentsRepository } from '@/domain/notebook/application/repositories/students-repository'

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = []

  async findByEmail(email: string) {
    const student = this.items.find((item) => item.email === email)

    if (!student) {
      return null
    }

    return student
  }

  async create(student: Student) {
    this.items.push(student)

    DomainEvents.dispatchEventsForAggregate(student.id)
  }
}
