import { NoteAttachment } from '@notebook/enterprise/entities/note-attachment'

export abstract class NoteAttachmentsRepository {
  abstract createMany(attachments: NoteAttachment[]): Promise<void>
  abstract deleteMany(attachments: NoteAttachment[]): Promise<void>
  abstract findManyByNoteId(noteId: string): Promise<NoteAttachment[]>
  abstract deleteManyByNoteId(noteId: string): Promise<void>
}
