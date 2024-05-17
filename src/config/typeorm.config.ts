import databaseConfig from './database.config';
import { DataSource, DataSourceOptions } from 'typeorm';

import { config } from 'dotenv';

config();

const dbDatasource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/database/migrations/*.{ts,js}'],
  migrationsTableName: 'migrations',
};

export const dataSource = new DataSource(dbDatasource);
