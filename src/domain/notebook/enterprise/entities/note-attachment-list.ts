import { WatchedList } from '@/core/entities/watched-list'
import { NoteAttachment } from './note-attachment'

export class NoteAttachmentList extends WatchedList<NoteAttachment> {
  compareItems(a: NoteAttachment, b: NoteAttachment): boolean {
    return a.attachmentId.toString() === b.attachmentId.toString()
  }
}
