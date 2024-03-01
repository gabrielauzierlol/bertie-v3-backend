import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@/domain/auth/auth.module'
import { envSchema } from '../env/env'
import { EnvModule } from '../env/env.module'
import { IdentityModule } from '@/domain/identity/infra/identity.module'
import { MongoModule } from '@/domain/common/infra/database/mongodb/mongo.module'
import { MongooseModule } from '@nestjs/mongoose'
import { EnvService } from '../env/env.service'
import { DATABASE } from './databases'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    MongooseModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      connectionName: DATABASE.BERTIE,
      useFactory(env: EnvService) {
        const URI = env.get('DATABASE_URL')
        Logger.debug(`Mongo @ ${URI}`, 'MongooseModule')
        return { uri: URI }
      },
    }),
    MongoModule,
    AuthModule,
    IdentityModule,
  ],
})
export class AppModule {}
