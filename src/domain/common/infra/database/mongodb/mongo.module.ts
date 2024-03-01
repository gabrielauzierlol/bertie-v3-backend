import { Module } from '@nestjs/common'

import { EnvService } from '@/core/env/env.service'
import { MongoService } from './mongo.service'

@Module({
  providers: [EnvService, MongoService],
  exports: [MongoService],
})
export class MongoModule {}
