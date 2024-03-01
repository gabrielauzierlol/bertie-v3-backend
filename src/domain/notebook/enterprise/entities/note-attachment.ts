import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface NoteAttachmentProps {
  noteId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class NoteAttachment extends Entity<NoteAttachmentProps> {
  get noteId() {
    return this.props.noteId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: NoteAttachmentProps, id?: UniqueEntityID) {
    const attachment = new NoteAttachment(props, id)

    return attachment
  }
}
