import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@Schema()
export class MongoNote {
  @Prop({ required: true })
  author_id: Types.ObjectId

  @Prop({ required: true })
  attachments_ids: Array<Types.ObjectId>

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  content: string

  @Prop({ required: true })
  slug: string

  @Prop({ required: true })
  created_at: Date

  @Prop({ type: Date, required: false })
  updated_at: Date | null | undefined
}

export const MongoNoteSchema = SchemaFactory.createForClass(MongoNote)

export const MongoNoteModel: ModelDefinition = {
  name: 'notes',
  schema: MongoNoteSchema,
}
