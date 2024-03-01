import { Document, Types, Model, Schema } from 'mongoose'

export interface BaseMongoDocument {
  _id: Types.ObjectId
  // Add other common fields for your documents here
}

export type MongooseDocument<T> = Document<unknown, NonNullable<unknown>, T> &
  BaseMongoDocument

export type MongooseModel<T extends Schema> = typeof Model<T>
