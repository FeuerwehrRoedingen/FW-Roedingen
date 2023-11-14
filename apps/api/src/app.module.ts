import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module'
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { JwtAuthGuard } from './auth/auth.guard'

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    NotificationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
