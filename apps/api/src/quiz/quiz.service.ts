import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class QuizService {
  constructor(private readonly databaseService: DatabaseService) {}

  async startQuiz(uid: string, level: number, amount: number) {
    const questions: Awaited<ReturnType<typeof this.databaseService.getQuestion>>[] = []

    for (let i = 0; i < amount; i++) {
      questions.push(await this.databaseService.getQuestion(level))
    }

    
  }

}
