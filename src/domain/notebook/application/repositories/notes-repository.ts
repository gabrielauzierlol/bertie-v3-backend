import { PaginationParams } from '@/core/repositories/pagination-params'
import { Note } from '@/domain/notebook/enterprise/entities/note'

export abstract class NotesRepository {
  abstract findById(id: string): Promise<Note | null>
  abstract findBySlug(slug: string): Promise<Note | null>
  abstract findManyRecent(
    authorId: string,
    params: PaginationParams,
  ): Promise<Note[]>

  abstract save(note: Note): Promise<void>
  abstract create(note: Note): Promise<void>
  abstract delete(note: Note): Promise<void>
}
