import { Module } from '@nestjs/common'
import { HealthCheckerController } from './controllers/health-checker.controller'

@Module({
  controllers: [HealthCheckerController],
})
export class HttpModule {}
