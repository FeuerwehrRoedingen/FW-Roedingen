import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

@Module({
  imports: [],
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}
