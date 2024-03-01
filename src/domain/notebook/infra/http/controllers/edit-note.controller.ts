import { CurrentUser } from '@/domain/auth/current-user-decorator'
import { UserPayload } from '@/domain/auth/jwt.strategy'
import { ZodValidationPipe } from '@/domain/common/infra/pipes/zod-validation-pipe'
import { EditNoteUseCase } from '@/domain/notebook/application/use-cases/edit-note'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'

const editNoteBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachmentsIds: z.array(z.string()),
})

const bodyValidationPipe = new ZodValidationPipe(editNoteBodySchema)

type EditNoteBodySchema = z.infer<typeof editNoteBodySchema>

@Controller('/notes/:id')
export class EditNoteController {
  constructor(private editNote: EditNoteUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditNoteBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') noteId: string,
  ) {
    const { title, content, attachmentsIds } = body
    const userId = user.sub

    const result = await this.editNote.execute({
      title,
      content,
      authorId: userId,
      noteId,
      attachmentsIds,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
