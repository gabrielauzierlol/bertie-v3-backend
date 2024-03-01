import { ZodValidationPipe } from '@/domain/common/infra/pipes/zod-validation-pipe'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { CurrentUser } from '@/domain/auth/current-user-decorator'
import { UserPayload } from '@/domain/auth/jwt.strategy'
import { NotePresenter } from '../presenters/note-presenter'
import { FetchRecentNotesUseCase } from '@/domain/notebook/application/use-cases/fetch-recent-notes'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/notes')
export class FetchRecentNotesController {
  constructor(private fetchRecentNotes: FetchRecentNotesUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    const result = await this.fetchRecentNotes.execute({
      authorId: userId,
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const notes = result.value.notes

    return { notes: notes.map(NotePresenter.toHTTP) }
  }
}
