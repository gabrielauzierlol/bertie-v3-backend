import { Controller, Get } from '@nestjs/common'
import { Public } from '@/core/infra/auth/public'

@Controller('/ok')
@Public()
export class HealthCheckerController {
  @Get()
  async handle() {
    return {
      message: '[bertie-v3-backend] Atualizado em 01/03/2024',
    }
  }
}
