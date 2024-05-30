import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePoolDetailsTable1717038319144 implements MigrationInterface {
  name = 'CreatePoolDetailsTable1717038319144';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pool_details" ("id" SERIAL NOT NULL, "curator_name" character varying(255) NOT NULL, "curator_comments" text, "token_vesting_start" TIMESTAMP, "token_vesting_end" TIMESTAMP, "token_cliff" TIMESTAMP, "swap_fee" numeric(20,2), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "poolId" integer, CONSTRAINT "PK_51fdeda499caa3a1f5fdb8419da" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pool_details" ADD CONSTRAINT "FK_1251eeb9aeac2920c4148f930fb" FOREIGN KEY ("poolId") REFERENCES "pools"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pool_details" DROP CONSTRAINT "FK_1251eeb9aeac2920c4148f930fb"`,
    );
    await queryRunner.query(`DROP TABLE "pool_details"`);
  }
}
