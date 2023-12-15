import { Module } from '@nestjs/common';
import { LeitstelleController } from './leitstelle.controller';
import { LeitstelleService } from './leitstelle.service';

@Module({
  controllers: [LeitstelleController],
  providers: [LeitstelleService]
})
export class LeitstelleModule {}
