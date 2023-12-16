import { Module } from '@nestjs/common'

import { DatabaseService } from './database.service'
import { DatabaseController } from './database.controller';
import { PrismaStudioService } from './prismaStudio.service';

@Module({
  providers: [
    DatabaseService,
    PrismaStudioService
  ],
  exports: [DatabaseService],
  controllers: [DatabaseController],
})
export class DatabaseModule {}
