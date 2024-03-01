import { Attachment } from '@notebook/enterprise/entities/attachment'

export abstract class AttachmentsRepository {
  abstract create(attachment: Attachment): Promise<void>
}
