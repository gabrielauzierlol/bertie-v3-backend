/* eslint-disable camelcase */
import { Note } from '@/domain/notebook/enterprise/entities/note'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MongooseDocument } from '@/core/types/mongo'
import { MongoNote } from '../schemas/mongo-note-schema'
import { Slug } from '@/domain/notebook/enterprise/entities/value-objects/slug'

export class MongoNoteMapper {
  static toDomain(doc: MongooseDocument<MongoNote>): Note {
    const raw = doc.toObject()

    return Note.create(
      {
        authorId: new UniqueEntityID(raw.author_id.toString()),
        title: raw.title,
        content: raw.content,
        slug: Slug.createFromText(raw.slug),
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityID(raw?._id.toString()),
    )
  }

  static arrayToDomain(docs: MongooseDocument<MongoNote>[]): Note[] {
    const raws = docs.map((doc) => doc.toObject())

    return raws.map((raw) =>
      Note.create(
        {
          authorId: new UniqueEntityID(raw.author_id.toString()),
          title: raw.title,
          content: raw.content,
          slug: Slug.createFromText(raw.slug),
          createdAt: raw.created_at,
          updatedAt: raw.updated_at,
        },
        new UniqueEntityID(raw?._id.toString()),
      ),
    )
  }

  static toMongo(note: Note): MongoNote {
    const attachments_ids = note.attachments
      .getItems()
      .map((att) => att.attachmentId.toObjectID())

    return {
      author_id: note.authorId.toObjectID(),
      attachments_ids,
      title: note.title,
      content: note.content,
      slug: note.slug.value,
      created_at: note.createdAt,
      updated_at: note.updatedAt,
    }
  }
}
