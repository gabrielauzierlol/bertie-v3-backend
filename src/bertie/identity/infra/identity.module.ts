import { Module } from '@nestjs/common'

import { CryptographyModule } from '@/core/infra/cryptography/cryptography.module'
/* Authenticate User */
import { AuthenticateUserController } from './http/controllers/authenticate-user.controller'
import { AuthenticateUserUseCase } from '../application/use-cases/authenticate-user'
/* Register User */
import { RegisterUserController } from './http/controllers/register-user.controller'
import { RegisterUserUseCase } from '../application/use-cases/register-user'
/* Find Authenticated User */
import { FindAuthenticatedUserController } from './http/controllers/find-authenticated-user.controller'
import { FindAuthenticatedUserUseCase } from '../application/use-cases/find-authenticated-user'
/* User Repository */
import { DatabaseModule } from './mongodb/database.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateUserController,
    RegisterUserController,
    FindAuthenticatedUserController,
  ],
  providers: [
    AuthenticateUserUseCase,
    RegisterUserUseCase,
    FindAuthenticatedUserUseCase,
  ],
})
export class IdentityModule {}
