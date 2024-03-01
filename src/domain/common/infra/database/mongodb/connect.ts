/* eslint-disable @typescript-eslint/no-explicit-any */
import { Connection, createConnection, Model, Schema } from 'mongoose'

type MongoModel = {
  [key: string]: Model<any>
}

export class MongoConnect {
  private connection: Connection
  private models: MongoModel = {}
  public uri: string

  constructor(uri: string) {
    this.uri = uri
    this.connection = createConnection(uri, {})
  }

  getConnection() {
    return this.connection
  }

  setModel(name: string, schema: Schema, collection: string) {
    this.models[name] = this.connection.model(name, schema, collection)
  }

  getModel<T extends Schema>(name: string): Model<T> {
    return this.models[name]
  }
}
