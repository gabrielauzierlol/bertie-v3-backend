import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

/* Global Modules */
import { MongoModule } from '@/core/infra/database/mongodb/mongo.module'
import { AuthModule } from '@/core/infra/auth/auth.module'
import { EnvModule } from '@/core/infra/env/env.module'
import { envSchema } from '@/core/infra/env/env'

/* Http Modules */
import { IdentityModule } from '@/bertie/identity/infra/identity.module'
import { HttpModule } from '../http/http.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    MongoModule,
    AuthModule,
    HttpModule,
    IdentityModule,
  ],
})
export class AppModule {}
