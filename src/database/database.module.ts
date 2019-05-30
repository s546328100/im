import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';

export default TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    ...configService.server,
    synchronize: false,
    entities: [__dirname + '/../entities/*.*'],
  }),
  inject: [ConfigService],
});
