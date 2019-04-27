import { Module, forwardRef } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
