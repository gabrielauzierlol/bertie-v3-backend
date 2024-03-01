import { Logger, UnprocessableEntityException } from '@nestjs/common'
import { Types } from 'mongoose'
import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  toObjectID(): Types.ObjectId {
    try {
      return new Types.ObjectId(this.value)
    } catch (error) {
      Logger.debug(error)
      throw new UnprocessableEntityException('Object ID failed validation.')
    }
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  public equals(id: UniqueEntityID) {
    return id.toValue() === this.value
  }
}
