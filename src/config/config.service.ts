import * as Joi from 'joi';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

export interface EnvConfig {
  [prop: string]: string;
}

export interface DbConfig {
  type: 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  name: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath || '.env'));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision', 'prod'])
        .default('development'),
      PORT: Joi.number().default(3002),
      JWT_EXPIRE: Joi.number().default(7200),
      JWT_SECRET_KEY: Joi.string().required(),
      DB_SERVER_HOST: Joi.string().required(),
      DB_SERVER_PORT: Joi.number().default(3306),
      DB_SERVER_USERNAME: Joi.string().required(),
      DB_SERVER_PASSWORD: Joi.string().required(),
      DB_SERVER_DATABASE: Joi.string().required(),
      DB_SERVER_TYPE: Joi.string().default('mysql'),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get port() {
    return this.envConfig.PORT;
  }

  get server(): DbConfig {
    const config = {
      type: this.envConfig.DB_SERVER_TYPE as 'mysql',
      host: this.envConfig.DB_SERVER_HOST,
      port: parseInt(this.envConfig.DB_SERVER_PORT, 10),
      username: this.envConfig.DB_SERVER_USERNAME,
      password: this.envConfig.DB_SERVER_PASSWORD,
      database: this.envConfig.DB_SERVER_DATABASE,
      name: 'server',
    };
    return config;
  }
}
