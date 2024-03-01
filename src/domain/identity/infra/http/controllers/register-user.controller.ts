import { Public } from '@/domain/auth/public'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/domain/common/infra/pipes/zod-validation-pipe'
import { RegisterUserUseCase } from '@/domain/identity/application/use-cases/register-user'
import { UserAlreadyExistsError } from '@/domain/identity/application/use-cases/errors/user-already-exists-error'

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
