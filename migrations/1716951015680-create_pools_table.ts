import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePoolsTable1716951015680 implements MigrationInterface {
  name = 'CreatePoolsTable1716951015680';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pools" ("id" SERIAL NOT NULL, "project_name" character varying NOT NULL, "ticker" character varying NOT NULL, "participants" integer NOT NULL, "funds_raised" numeric(18,8) NOT NULL, "live_until" TIMESTAMP, "status" character varying NOT NULL, "opens_on" TIMESTAMP, "chain" character varying NOT NULL, "start_date" TIMESTAMP, "curator" character varying, "social_links" jsonb, "token_vesting" boolean, "lbp_type" character varying, "about" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6708c86fc389259de3ee43230ee" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pools"`);
  }
}
