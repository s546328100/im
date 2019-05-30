import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { EventsModule } from '../events/events.module';
import { UserService } from './user.service';
import { createRepositoryProvider } from 'src/common/helper';
import { Members } from 'src/entities/members';
import { REPOSITORY_MEMBERS } from 'src/constants';

@Module({
  imports: [EventsModule],
  controllers: [UserController],
  providers: [
    createRepositoryProvider(REPOSITORY_MEMBERS, Members),
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
