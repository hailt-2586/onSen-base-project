import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePoolsTable1715933704459 implements MigrationInterface {
  name = 'CreatePoolsTable1715933704459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pools" ("id" SERIAL NOT NULL, "project_name" character varying NOT NULL, "contract_address" character varying NOT NULL, "description" text, "participants" integer NOT NULL DEFAULT '0', "funds_raised" numeric(20,8) NOT NULL DEFAULT '0', "status" character varying NOT NULL, "start_date" TIMESTAMP, "end_date" TIMESTAMP, "chain" character varying, "curator" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c30f435d0c33ab4a2f832f9e4c3" UNIQUE ("contract_address"), CONSTRAINT "PK_6708c86fc389259de3ee43230ee" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pools"`);
  }
}
