import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

import { Note } from '@notebook/enterprise/entities/note'
import { NotesRepository } from '@notebook/application/repositories/notes-repository'
import { NoteAttachment } from '../../enterprise/entities/note-attachment'
import { NoteAttachmentList } from '../../enterprise/entities/note-attachment-list'

interface CreateNoteUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateNoteUseCaseResponse = Either<
  null,
  {
    note: Note
  }
>

@Injectable()
export class CreateNoteUseCase {
  constructor(private notesRepository: NotesRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: CreateNoteUseCaseRequest): Promise<CreateNoteUseCaseResponse> {
    const note = Note.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    const noteAttachments = attachmentsIds.map((attachmentId) => {
      return NoteAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        noteId: note.id,
      })
    })

    note.attachments = new NoteAttachmentList(noteAttachments)

    await this.notesRepository.create(note)

    return right({
      note,
    })
  }
}
