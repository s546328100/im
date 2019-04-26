import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [EventsModule],
  controllers: [UserController],
})
export class UserModule {}
