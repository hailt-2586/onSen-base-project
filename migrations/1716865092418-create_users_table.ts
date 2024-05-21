import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1716865092418 implements MigrationInterface {
  name = 'CreateUsersTable1716865092418';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "wallet_address" character varying NOT NULL, "signature" character varying, "description" text, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_196ef3e52525d3cd9e203bdb1de" UNIQUE ("wallet_address"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
