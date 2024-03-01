import { EnvService } from '@/core/env/env.service'
import { Injectable, OnModuleDestroy } from '@nestjs/common'
import mongoose from 'mongoose'

@Injectable()
export class MongoService implements OnModuleDestroy {
  private connection: mongoose.Connection

  constructor(private envService: EnvService) {}

  onModuleDestroy() {
    return mongoose.disconnect()
  }

  getConnection() {
    return this.connection
  }
}
