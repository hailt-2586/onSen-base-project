import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePriceHistoryTable1716964694820 implements MigrationInterface {
  name = 'CreatePriceHistoryTable1716964694820';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "price_history" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "price" numeric(20,10) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "poolId" integer, CONSTRAINT "PK_e41e25472373d4b574b153229e9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "price_history" ADD CONSTRAINT "FK_589a70dedd0adbed325894aabed" FOREIGN KEY ("poolId") REFERENCES "pools"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "price_history" DROP CONSTRAINT "FK_589a70dedd0adbed325894aabed"`,
    );
    await queryRunner.query(`DROP TABLE "price_history"`);
  }
}
