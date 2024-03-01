import { NoteAttachmentsRepository } from '@/domain/notebook/application/repositories/note-attachments-repository'
import { NoteAttachment } from '@/domain/notebook/enterprise/entities/note-attachment'
import { Injectable } from '@nestjs/common'
import { MongoNoteAttachment } from '../schemas/mongo-note-attachment-schema'
import { MongoNoteAttachmentMapper } from '../mappers/mongo-note-attachment-mapper'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { DATABASE } from '@/core/app/databases'

/**
 * @deprecated
 *
 * This is a repository that register relationships between tables
 *
 * In fact, MongoDB is a non-relational database, which means that
 * relationships between two documents must be done with a foreign
 * key append to each document in its own register.
 *
 * Therefore, we only need to use MongoNotesRepository
 *
 * @see {MongoNotesRepository} for details
 *
 */
@Injectable()
export class MongoNoteAttachmentsRepository
  implements NoteAttachmentsRepository
{
  constructor(
    @InjectModel('note_attachments', DATABASE.MAIN)
    private model: Model<MongoNoteAttachment>,
  ) {}

  async deleteMany(attachments: NoteAttachment[]): Promise<void> {
    await this.model.deleteMany({
      attachment_id: {
        $in: attachments.map(({ attachmentId }) => attachmentId),
      },
    })
  }

  async deleteManyByNoteId(noteId: string): Promise<void> {
    await this.model.deleteMany({ note_id: noteId })
  }

  async findManyByNoteId(noteId: string): Promise<NoteAttachment[]> {
    const attachments = await this.model.find({ note_id: noteId })

    return attachments.map(MongoNoteAttachmentMapper.toDomain)
  }

  async createMany(attachments: NoteAttachment[]): Promise<void> {
    if (attachments.length === 0) return

    await this.model.create(attachments.map(MongoNoteAttachmentMapper.toMongo))
  }
}
