/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect, Mongoose } from 'mongoose'

export const MongoHelper = {
  client: null as Mongoose | null,
  uri: null as string | null,

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await connect(uri, {})
  },

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.disconnect()
      this.client = null
    }
  },

  async getCollection(name: string) {
    if (!this.client || this.client.connection.readyState !== 1) {
      await this.connect(this.uri!)
    }
    const collection = this.client!.connection.db.collection(name)

    return collection
  },

  map: (data: any) => {
    const { _id, ...rest } = data
    return { ...rest, id: _id }
  },

  mapCollection: (collection: any[]) => {
    return collection.map((c) => MongoHelper.map(c))
  },

  getFloat: (value: number): string => {
    return (value / 100).toFixed(2)
  },

  setFloat: (value: number): number => {
    return Math.trunc(value * 100)
  },
}
