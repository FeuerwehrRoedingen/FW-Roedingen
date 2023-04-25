import { Controller, Get, Post, Delete } from '@nestjs/common';
import { OauthService } from './oauth.service';

@Controller()
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Get('/authorize')
  getAuthorize(): string {
    return this.oauthService.getAuthorize();
  }
  @Post('/authorize')
  postAuthorize(): string {
    return this.oauthService.postAuthorize();
  }

  @Post('/token')
  postToken(): string {
    return this.oauthService.postToken();
  }

  @Get('/userinfo')
  getUserinfo(): string {
    return this.oauthService.getUserinfo();
  }

  @Delete('/logout')
  deleteLogout(): string {
    return this.oauthService.deleteLogout();
  }
}
