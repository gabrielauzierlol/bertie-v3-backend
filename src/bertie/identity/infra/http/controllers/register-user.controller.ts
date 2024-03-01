import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'

import { RegisterUserUseCase } from '@/bertie/identity/application/use-cases/register-user'
import { UserAlreadyExistsError } from '@/bertie/identity/application/use-cases/errors/user-already-exists-error'

import { ZodValidationPipe } from '@/core/infra/pipes/zod-validation-pipe'
import { z } from 'zod'
import { Public } from '@/core/infra/auth/public'

const registerUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type RegisterUserBodySchema = z.infer<typeof registerUserBodySchema>

@Controller('/identity/users')
@Public()
export class RegisterUserController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerUserBodySchema))
  async handle(@Body() body: RegisterUserBodySchema) {
    const { name, email, password } = body

    const result = await this.registerUser.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
