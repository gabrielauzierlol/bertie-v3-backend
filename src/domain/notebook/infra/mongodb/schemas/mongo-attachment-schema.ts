import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class MongoAttachment {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  url: string
}

export const MongoAttachmentSchema =
  SchemaFactory.createForClass(MongoAttachment)

export const MongoAttachmentModel: ModelDefinition = {
  name: 'attachments',
  schema: MongoAttachmentSchema,
}
