import { Module } from '@nestjs/common'

// Create Note
import { CreateNoteUseCase } from '../application/use-cases/create-note'
import { CreateNoteController } from './http/controllers/create-note.controller'
// Authenticate
import { AuthenticateStudentUseCase } from '../application/use-cases/authenticate-student'
import { AuthenticateController } from './http/controllers/authenticate.controller'
// Register Student
import { RegisterStudentUseCase } from '../application/use-cases/register-student'
import { CreateAccountController } from './http/controllers/create-account.controller'
// Fetch Recent Notes
import { FetchRecentNotesUseCase } from '../application/use-cases/fetch-recent-notes'
import { FetchRecentNotesController } from './http/controllers/fetch-recent-notes.controller'
// Edit Note
import { EditNoteUseCase } from '../application/use-cases/edit-note'
import { EditNoteController } from './http/controllers/edit-note.controller'
// Delete Note
import { DeleteNoteUseCase } from '../application/use-cases/delete-note'
import { DeleteNoteController } from './http/controllers/delete-note.controller'
// Upload and Create Attachment
import { UploadAndCreateAttachmentUseCase } from '../application/use-cases/upload-and-create-attachment'
import { UploadAttachmentController } from './http/controllers/upload-attachment.controller'

import { CryptographyModule } from './cryptography/cryptography.module'
import { DatabaseModule } from './mongodb/database.module'
import { StorageModule } from './storage/storage.module'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    AuthenticateController,
    CreateAccountController,
    CreateNoteController,
    FetchRecentNotesController,
    EditNoteController,
    DeleteNoteController,
    UploadAttachmentController,
  ],
  providers: [
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    CreateNoteUseCase,
    FetchRecentNotesUseCase,
    EditNoteUseCase,
    DeleteNoteUseCase,
    UploadAndCreateAttachmentUseCase,
  ],
})
export class NotebookModule {}
