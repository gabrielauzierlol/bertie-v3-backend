import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Optional } from '@/core/types/optional'

import { Slug } from './value-objects/slug'
import { NoteAttachmentList } from './note-attachment-list'

export interface NoteProps {
  authorId: UniqueEntityID
  title: string
  content: string
  slug: Slug
  attachments: NoteAttachmentList
  createdAt: Date
  updatedAt?: Date | null
}

export class Note extends AggregateRoot<NoteProps> {
  get authorId() {
    return this.props.authorId
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)

    this.touch()
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: NoteAttachmentList) {
    this.props.attachments = attachments
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<NoteProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const note = new Note(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new NoteAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return note
  }
}
