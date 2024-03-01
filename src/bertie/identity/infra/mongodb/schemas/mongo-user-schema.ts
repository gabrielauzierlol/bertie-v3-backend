import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class MongoUser {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  password: string
}

export const MongoUserSchema = SchemaFactory.createForClass(MongoUser)

export const MongoUserModel: ModelDefinition = {
  name: 'Identity_User',
  schema: MongoUserSchema,
  collection: 'Identity_User',
}
