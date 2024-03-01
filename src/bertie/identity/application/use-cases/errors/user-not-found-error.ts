import { UseCaseError } from '@/core/domain/errors/use-case-error'

export class UserNotFoundError extends Error implements UseCaseError {
  constructor() {
    super(`User not found.`)
  }
}
