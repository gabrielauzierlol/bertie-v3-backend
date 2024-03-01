import { Injectable, Logger } from '@nestjs/common'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { UsersRepository } from '../repositories/users-repository'
import { HashComparer } from '@/core/application/cryptography/hash-comparer'
import { Encrypter } from '@/core/application/cryptography/encrypter'
import { Either, left, right } from '@/core/application/either'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private UsersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.UsersRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    Logger.debug(user)

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
