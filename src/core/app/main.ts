import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from '@/core/env/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})

  const configService = app.get<ConfigService<Env, true>>(ConfigService)

  // await MongoManager.getInstance().init(
  //   configService.get('DATABASE_URL'),
  //   configService.get('DATABASE_URL_SECONDARY'),
  // )

  const port = configService.get('PORT', { infer: true })

  await app.listen(port)
}
bootstrap()
