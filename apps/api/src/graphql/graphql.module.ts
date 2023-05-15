import { Module } from '@nestjs/common';
import { GraphqlService } from './graphql.service';
import { GraphqlController } from './graphql.controller';

@Module({
  providers: [GraphqlService],
  controllers: [GraphqlController]
})
export class GraphqlModule {}
