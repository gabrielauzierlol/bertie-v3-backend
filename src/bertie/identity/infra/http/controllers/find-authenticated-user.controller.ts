import { UserNotFoundError } from '@/bertie/identity/application/use-cases/errors/user-not-found-error'
import { FindAuthenticatedUserUseCase } from '@/bertie/identity/application/use-cases/find-authenticated-user'
import { CurrentUser } from '@/core/infra/auth/current-user-decorator'
import { UserPayload } from '@/core/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
} from '@nestjs/common'

@Controller('identity/authenticate')
export class FindAuthenticatedUserController {
  constructor(private findAuthenticatedUser: FindAuthenticatedUserUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const userId = user.sub

    const result = await this.findAuthenticatedUser.execute({ id: userId })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { ...result.value }
  }
}
