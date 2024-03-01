import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { UsersRepository } from '../repositories/users-repository'

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
    const User = await this.UsersRepository.findByEmail(email)

    if (!User) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      User.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: User.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
