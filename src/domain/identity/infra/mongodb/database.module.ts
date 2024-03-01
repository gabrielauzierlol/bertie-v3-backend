import { Module } from '@nestjs/common'
import { UsersRepository } from '../../application/repositories/users-repository'
import { MongoUsersRepository } from './repositories/mongo-users-repositories'

import { MongooseModule } from '@nestjs/mongoose'
import { MongoUserModel } from './schemas/mongo-user-schema'
import { DATABASE } from '@/core/app/databases'

@Module({
  imports: [MongooseModule.forFeature([MongoUserModel], DATABASE.HOMOLOG)],
  providers: [
    {
      provide: UsersRepository,
      useClass: MongoUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
