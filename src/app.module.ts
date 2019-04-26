import { Module } from '@nestjs/common';
import { EventsGateway } from './events/events.gateway';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, EventsGateway],
})
export class AppModule {}
