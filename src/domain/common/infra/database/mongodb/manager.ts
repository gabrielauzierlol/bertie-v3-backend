/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
import { Logger } from '@nestjs/common'
import { MongoConnect } from './connect'
import { Schema } from 'mongoose'

export type Connections = 'main' | 'secondary'

export class MongoManager {
  private static instance: MongoManager

  private logger = new Logger(MongoManager.name)
  private connections = {
    main: null as MongoConnect | null,
    secondary: null as MongoConnect | null,
  }

  private models: Record<string, MongoConnect> = {}

  static getInstance(): MongoManager {
    if (!MongoManager.instance) {
      Logger.debug('Creating singleton instance of MongoManager')
      MongoManager.instance = new MongoManager()
    }
    return MongoManager.instance
  }

  async init(main: string, secondary: string): Promise<void> {
    this.logger.log('Initializing Mongo Manager')
    this.logger.debug(`main: ${main}`)
    this.logger.debug(`secondary: ${secondary}`)
    this.connections.main = new MongoConnect(main)
    this.connections.secondary = new MongoConnect(secondary)
    try {
      await Promise.all([
        this.connections.main.getConnection(),
        this.connections.secondary.getConnection(),
      ])
      this.logger.log('Connected!')
    } catch (error) {
      this.logger.error('Error to connect to mongodb')
      this.logger.debug(error)
      throw new Error('Error to connect to mongoDB')
    }
  }

  conn(connection: Connections): MongoConnect {
    return this.connections[connection]!
  }

  /** Register Model  */
  inject(
    connection: Connections,
    name: string,
    schema: any,
    collection: string,
    timeout = 500,
  ): Promise<MongoConnect> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const conn = this.conn(connection)

        conn.getConnection()
        conn.setModel(name, schema, collection)
        this.models[name] = conn // Store the connection instance, not the connection name
        resolve(conn)
      }, timeout)
    })
  }

  model<T extends Schema>(name: string) {
    const conn = this.models[name]
    if (!conn) {
      throw new Error(`Model '${name}' not found`)
    }
    return conn.getModel<T>(name)
  }
}
