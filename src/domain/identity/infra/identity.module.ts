import { Module } from '@nestjs/common'

import { CryptographyModule } from './cryptography/cryptography.module'
import { AuthenticateUserController } from './http/controllers/authenticate-user.controller'
import { AuthenticateUserUseCase } from '../application/use-cases/authenticate-user'
import { RegisterUserController } from './http/controllers/register-user.controller'
import { RegisterUserUseCase } from '../application/use-cases/register-user'
import { DatabaseModule } from './mongodb/database.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AuthenticateUserController, RegisterUserController],
  providers: [AuthenticateUserUseCase, RegisterUserUseCase],
})
export class IdentityModule {}
