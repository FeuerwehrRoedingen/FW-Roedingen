import { Injectable } from '@nestjs/common'
import type { Borrow } from '@prisma/client'

import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class BorrowService {

  constructor(private readonly databaseService: DatabaseService) {}

  getAll() {
    return this.databaseService.borrow.findMany();
  }
  getById(id: string) {

    const parsedId = parseInt(id, 10);

    return this.databaseService.borrow.findUnique({ where: { id: parsedId } });
  }
  add(borrow: Borrow) {
    throw new Error('Method not implemented.');
  }
}
