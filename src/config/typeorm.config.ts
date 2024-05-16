import { DataSource, DataSourceOptions } from 'typeorm';

const dbDataSource: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: parseInt(`${process.env.DB_PORT}`, 10),
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_DATABASE}`,
  synchronize: false,
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/migrations/*.{ts,js}'],
  migrationsTableName: 'migrations',
};

export const dataSource = new DataSource(dbDataSource);
