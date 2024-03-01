import { Attachment } from '@/domain/notebook/enterprise/entities/attachment'
import { MongoAttachment } from '../schemas/mongo-attachment-schema'

export class MongoAttachmentMapper {
  static toMongo(attachment: Attachment): MongoAttachment {
    return {
      title: attachment.title,
      url: attachment.url,
    }
  }
}
