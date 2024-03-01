import { CurrentUser } from '@/domain/auth/current-user-decorator'
import { UserPayload } from '@/domain/auth/jwt.strategy'
import { DeleteNoteUseCase } from '@/domain/notebook/application/use-cases/delete-note'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller('/notes/:id')
export class DeleteNoteController {
  constructor(private deleteNote: DeleteNoteUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param('id') noteId: string) {
    const userId = user.sub

    const result = await this.deleteNote.execute({
      noteId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
