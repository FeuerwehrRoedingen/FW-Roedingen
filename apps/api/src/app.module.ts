import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module'
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { JwtAuthGuard } from './auth/auth.guard'
import { FirebaseModule } from './firebase/firebase.module';
import { RoleGuard } from './auth/role.guard'
import { LeitstelleModule } from './leitstelle/leitstelle.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    NotificationModule,
    UserModule,
    FirebaseModule,
    LeitstelleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard, 
    },
    {
      provide: 'APP_GUARD',
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
