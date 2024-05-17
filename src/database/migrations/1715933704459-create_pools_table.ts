import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePoolsTable1715933704459 implements MigrationInterface {
  name = 'CreatePoolsTable1715933704459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pools" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "ticker" character varying(50) NOT NULL, "participants" integer NOT NULL, "funds_raised" numeric(18,8) NOT NULL, "live_until" TIMESTAMP, "status" character varying(50) NOT NULL, "opens_on" TIMESTAMP, "chain" character varying(50) NOT NULL, "start_date" TIMESTAMP, "end_date" TIMESTAMP, "curator" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6708c86fc389259de3ee43230ee" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pools"`);
  }
}
