import { MongooseModule } from '@nestjs/mongoose'
import { Logger, Module } from '@nestjs/common'

import { DATABASE } from '@/core/application/databases'

import { EnvService } from '@/core/infra/env/env.service'
import { EnvModule } from '@/core/infra/env/env.module'

@Module({
  imports: [
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
  ],
})
export class MongoModule {}
