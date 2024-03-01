import { Public } from '@/domain/auth/public'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/domain/common/infra/pipes/zod-validation-pipe'
import { AuthenticateUserUseCase } from '@/domain/identity/application/use-cases/authenticate-user'
import { WrongCredentialsError } from '@/domain/identity/application/use-cases/errors/wrong-credentials-error'

const authenticateUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateUserBodySchema = z.infer<typeof authenticateUserBodySchema>

@Controller('/identity/authenticate')
@Public()
export class AuthenticateUserController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateUserBodySchema))
  async handle(@Body() body: AuthenticateUserBodySchema) {
    const { email, password } = body

    const result = await this.authenticateUser.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
