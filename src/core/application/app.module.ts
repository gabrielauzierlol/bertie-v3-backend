import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

/* Global Modules */
import { MongoModule } from '../infra/database/mongodb/mongo.module'
import { EnvModule } from '../infra/env/env.module'
import { envSchema } from '../infra/env/env'

/* Bertie Modules */
import { AuthModule } from '@/bertie/auth/auth.module'
import { IdentityModule } from '@/bertie/identity/infra/identity.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    MongoModule,
    AuthModule,
    IdentityModule,
  ],
})
export class AppModule {}
