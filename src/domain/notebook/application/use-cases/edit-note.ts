import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Injectable } from '@nestjs/common'
import { Note } from '@notebook/enterprise/entities/note'
import { NotesRepository } from '../repositories/notes-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { NoteAttachmentsRepository } from '../repositories/note-attachments-repository'
import { NoteAttachmentList } from '../../enterprise/entities/note-attachment-list'
import { NoteAttachment } from '../../enterprise/entities/note-attachment'

interface EditNoteUseCaseRequest {
  authorId: string
  noteId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditNoteUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    note: Note
  }
>

@Injectable()
export class EditNoteUseCase {
  constructor(
    private notesRepository: NotesRepository,
    private noteAttachmentsRepository: NoteAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    noteId: _noteId,
    title,
    content,
    attachmentsIds,
  }: EditNoteUseCaseRequest): Promise<EditNoteUseCaseResponse> {
    const noteId = new UniqueEntityID(_noteId)
    noteId.toObjectID() // type cast validation

    const note = await this.notesRepository.findById(noteId.toString())

    if (!note) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== note.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentNoteAttachments =
      await this.noteAttachmentsRepository.findManyByNoteId(noteId.toString())

    const noteAttachmentList = new NoteAttachmentList(currentNoteAttachments)

    const newNoteAttachments = attachmentsIds.map((attachmentId) => {
      return NoteAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        noteId: note.id,
      })
    })

    noteAttachmentList.update(newNoteAttachments)

    note.title = title
    note.content = content
    note.attachments = noteAttachmentList

    await this.notesRepository.save(note)

    return right({
      note,
    })
  }
}
