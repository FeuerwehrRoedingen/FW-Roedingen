import { Module } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers:   [BorrowService],
  controllers: [BorrowController],
  imports:     [DatabaseModule]
})
export class BorrowModule {}
