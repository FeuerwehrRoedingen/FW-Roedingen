import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { Borrow } from '@prisma/client';

import { BorrowService } from './borrow.service';

@Controller('borrow')
export class BorrowController {

  constructor(private readonly borrowService: BorrowService) {}

  @Get()
  getAll() {
    return this.borrowService.getAll();
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.borrowService.getById(id);
  }

  @Post()
  add(@Body() borrow: Borrow) {
    return this.borrowService.add(borrow);
  }
}
