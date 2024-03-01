import { Note } from '@notebook/enterprise/entities/note'

export class NotePresenter {
  static toHTTP(note: Note) {
    return {
      id: note.id.toString(),
      authorId: note.authorId.toString(),
      title: note.title,
      content: note.content,
      slug: note.slug.value,
      createdAt: note.createdAt,
      updatedAt: note.createdAt,
    }
  }
}
