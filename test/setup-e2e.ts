import 'dotenv/config'

import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { disconnect } from 'mongoose'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from '@/core/infra/env/env'
import { EnvModule } from '@/core/infra/env/env.module'
import { AuthModule } from '@/bertie/auth/auth.module'
import { IdentityModule } from '@/bertie/identity/infra/identity.module'
import { DATABASE } from '@/core/application/databases'

let mongo: MongoMemoryServer

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    connectionName: DATABASE.BERTIE,
    useFactory: async () => {
      mongo = await MongoMemoryServer.create()
      const mongoUri = mongo.getUri()

      // console.log(mongoUri)
      return {
        uri: mongoUri,
        ...options,
      }
    },
  })

export const closeMongoConnection = async () => {
  await disconnect()
  if (mongo) await mongo.stop()
}

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    AuthModule,
    IdentityModule,
    rootMongooseTestModule(),
  ],
})
export class TestAppModule {}
