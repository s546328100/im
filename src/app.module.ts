import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { ConfigModule } from './config/config.module';
import databaseModule from './database/database.module';

@Module({
  imports: [UserModule, EventsModule, ConfigModule, databaseModule],
})
export class AppModule {}
