/* eslint-disable no-use-before-define */

import { EnvService } from '@/core/env/env.service'
import { Logger } from '@nestjs/common'
import mongoose from 'mongoose'

export class MongoConnection {
  private static instance: MongoConnection
  private static connection: mongoose.Connection

  constructor() {}

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection()
    }

    return MongoConnection.instance
  }

  public getConnection(): mongoose.Connection {
    return MongoConnection.connection
  }

  public init(envService: EnvService): void {
    const URI = envService.get('DATABASE_URL')

    Logger.debug(`Connecting database @ ${URI}`, 'MongoConnection')
    MongoConnection.connection = mongoose.createConnection(URI)
  }
}
