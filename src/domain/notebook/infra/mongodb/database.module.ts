import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// Repositories
import { StudentsRepository } from '../../application/repositories/students-repository'
import { NotesRepository } from '../../application/repositories/notes-repository'
import { AttachmentsRepository } from '../../application/repositories/attachments-repository'
import { NoteAttachmentsRepository } from '../../application/repositories/note-attachments-repository'
// Mongo Providers
import { MongoStudentsRepository } from './repositories/mongo-students-repository'
import { MongoNotesRepository } from './repositories/mongo-notes-repository'
import { MongoAttachmentsRepository } from './repositories/mongo-attachments-repository'
import { MongoNoteAttachmentsRepository } from './repositories/mongo-note-attachments-repository'
// Schemas
import { MongoStudentModel } from './schemas/mongo-students-schema'
import { MongoNoteModel } from './schemas/mongo-note-schema'
import { MongoAttachmentModel } from './schemas/mongo-attachment-schema'
import { MongoNoteAttachmentModel } from './schemas/mongo-note-attachment-schema'
import { DATABASE } from '@/core/app/databases'

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        MongoStudentModel,
        MongoNoteModel,
        MongoAttachmentModel,
        MongoNoteAttachmentModel,
      ],
      DATABASE.MAIN,
    ),
  ],
  providers: [
    {
      provide: StudentsRepository,
      useClass: MongoStudentsRepository,
    },
    {
      provide: NotesRepository,
      useClass: MongoNotesRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: MongoAttachmentsRepository,
    },
    {
      provide: NoteAttachmentsRepository,
      useClass: MongoNoteAttachmentsRepository,
    },
  ],
  exports: [
    StudentsRepository,
    NotesRepository,
    AttachmentsRepository,
    NoteAttachmentsRepository,
  ],
})
export class DatabaseModule {}
