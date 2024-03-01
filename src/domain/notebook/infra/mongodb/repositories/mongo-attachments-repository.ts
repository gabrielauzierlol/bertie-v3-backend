import { AttachmentsRepository } from '@/domain/notebook/application/repositories/attachments-repository'
import { Attachment } from '@/domain/notebook/enterprise/entities/attachment'
import { MongoAttachment } from '../schemas/mongo-attachment-schema'
import { MongoAttachmentMapper } from '../mappers/mongo-attachment-mapper'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { DATABASE } from '@/core/app/databases'

@Injectable()
export class MongoAttachmentsRepository implements AttachmentsRepository {
  constructor(
    @InjectModel('attachments', DATABASE.MAIN)
    private model: Model<MongoAttachment>,
  ) {}

  async create(attachment: Attachment): Promise<void> {
    await this.model.create(MongoAttachmentMapper.toMongo(attachment))
  }
}
