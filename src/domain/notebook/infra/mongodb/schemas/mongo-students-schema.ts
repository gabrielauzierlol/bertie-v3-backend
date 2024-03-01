import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class MongoStudent {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  password: string
}

export const MongoStudentSchema = SchemaFactory.createForClass(MongoStudent)

export const MongoStudentModel: ModelDefinition = {
  name: 'students',
  schema: MongoStudentSchema,
}
