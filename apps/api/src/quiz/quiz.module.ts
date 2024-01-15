import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [QuizController],
  providers: [QuizService],
  imports: [DatabaseModule],
})
export class QuizModule {}
