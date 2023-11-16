import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [NotificationService],
  controllers: [NotificationController],
  imports: [DatabaseModule]
})
export class NotificationModule {}
