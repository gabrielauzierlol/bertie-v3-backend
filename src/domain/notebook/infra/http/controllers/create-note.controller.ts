import { ZodValidationPipe } from '@/domain/common/infra/pipes/zod-validation-pipe'
import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'

import { CreateNoteUseCase } from '@notebook/application/use-cases/create-note'

import { UserPayload } from '@/domain/auth/jwt.strategy'
import { CurrentUser } from '@/domain/auth/current-user-decorator'

const createNoteBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string()),
})

const bodyValidationPipe = new ZodValidationPipe(createNoteBodySchema)

type CreateNoteBodySchema = z.infer<typeof createNoteBodySchema>

@Controller('/notes')
export class CreateNoteController {
  constructor(private createNote: CreateNoteUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateNoteBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content, attachments } = body
    const userId = user.sub

    const result = await this.createNote.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: attachments,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
