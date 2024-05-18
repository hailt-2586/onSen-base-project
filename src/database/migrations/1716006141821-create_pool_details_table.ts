import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePoolDetailsTable1716006141821 implements MigrationInterface {
  name = 'CreatePoolDetailsTable1716006141821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pool_details" ("id" SERIAL NOT NULL, "price" numeric(18,8) NOT NULL, "volume" numeric(18,8) NOT NULL, "liquidity" numeric(18,8) NOT NULL, "raise" numeric(18,8) NOT NULL, "token_vesting" json, "token_cliff" json, "token_weightings" json, "details" text, "about" text, "team" json, "ecosystem" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "pool_id" integer, CONSTRAINT "PK_51fdeda499caa3a1f5fdb8419da" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pool_details" ADD CONSTRAINT "FK_6fa625995386732ae7b50444a0f" FOREIGN KEY ("pool_id") REFERENCES "pools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pool_details" DROP CONSTRAINT "FK_6fa625995386732ae7b50444a0f"`,
    );
    await queryRunner.query(`DROP TABLE "pool_details"`);
  }
}
