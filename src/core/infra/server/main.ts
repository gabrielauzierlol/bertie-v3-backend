import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { Env } from '@/core/infra/env/env'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})

  const configService = app.get<ConfigService<Env, true>>(ConfigService)

  const port = configService.get('PORT', { infer: true })

  await app.listen(port, () => {
    Logger.debug(`Listening at port ${port}`, 'main')
  })
}
bootstrap()
