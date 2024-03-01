import { Note } from '@notebook/enterprise/entities/note'
import { NotesRepository } from '../repositories/notes-repository'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface FetchRecentNotesUseCaseRequest {
  authorId: string
  page: number
}

type FetchRecentNotesUseCaseResponse = Either<
  null,
  {
    notes: Note[]
  }
>

@Injectable()
export class FetchRecentNotesUseCase {
  constructor(private notesRepository: NotesRepository) {}

  async execute({
    authorId,
    page,
  }: FetchRecentNotesUseCaseRequest): Promise<FetchRecentNotesUseCaseResponse> {
    const notes = await this.notesRepository.findManyRecent(authorId, { page })

    return right({
      notes,
    })
  }
}
