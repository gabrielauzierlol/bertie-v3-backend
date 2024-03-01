import { Either, left, right } from '@/core/application/either'
import { UsersRepository } from '../repositories/users-repository'
import { UserNotFoundError } from './errors/user-not-found-error'
import { Injectable, Logger } from '@nestjs/common'

interface FindAuthenticatedUserUseCaseRequest {
  id: string
}

type AuthenticateUserUseCaseResponse = Either<
  UserNotFoundError,
  {
    user: {
      email: string
      name: string
    }
  }
>

@Injectable()
export class FindAuthenticatedUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: FindAuthenticatedUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    Logger.debug('Chegou aqui ====> 1')
    const foundUser = await this.usersRepository.findById(id)

    Logger.debug('Chegou aqui ====> ')

    if (!foundUser) {
      return left(new UserNotFoundError())
    }

    return right({
      user: {
        email: foundUser.email,
        name: foundUser.name,
      },
    })
  }
}
