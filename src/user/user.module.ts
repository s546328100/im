import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { EventsModule } from 'src/events/events.module';
import { UserService } from './user.service';

@Module({
  imports: [EventsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
