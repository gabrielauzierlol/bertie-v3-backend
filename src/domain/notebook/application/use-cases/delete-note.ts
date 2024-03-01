import { Either, left, right } from '@/core/either'
import { NotesRepository } from '../repositories/notes-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface DeleteNoteUseCaseRequest {
  authorId: string
  noteId: string
}

type DeleteNoteUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteNoteUseCase {
  constructor(private notesRepository: NotesRepository) {}

  async execute({
    noteId: _noteId,
    authorId,
  }: DeleteNoteUseCaseRequest): Promise<DeleteNoteUseCaseResponse> {
    const noteId = new UniqueEntityID(_noteId)
    noteId.toObjectID() // type cast validation

    const note = await this.notesRepository.findById(noteId.toString())

    if (!note) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== note.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.notesRepository.delete(note)

    return right(null)
  }
}
