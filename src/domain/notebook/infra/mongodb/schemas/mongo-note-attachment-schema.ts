import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@Schema()
export class MongoNoteAttachment {
  @Prop({ required: true })
  note_id: Types.ObjectId

  @Prop({ required: true })
  attachment_id: Types.ObjectId
}

export const MongoNoteAttachmentSchema =
  SchemaFactory.createForClass(MongoNoteAttachment)

export const MongoNoteAttachmentModel: ModelDefinition = {
  name: 'note_attachments',
  schema: MongoNoteAttachmentSchema,
}
