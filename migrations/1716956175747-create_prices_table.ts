import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePricesTable1716956175747 implements MigrationInterface {
  name = 'CreatePricesTable1716956175747';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "prices" ("id" SERIAL NOT NULL, "current_price" numeric(20,10) NOT NULL, "market_cap" numeric(20,2), "liquidity" numeric(20,2), "pool_value" numeric(20,2), "fdv" numeric(20,2), "volume" numeric(20,2), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "poolId" integer, CONSTRAINT "PK_2e40b9e4e631a53cd514d82ccd2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "prices" ADD CONSTRAINT "FK_6800b0529ef82b072a4a4ae0737" FOREIGN KEY ("poolId") REFERENCES "pools"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prices" DROP CONSTRAINT "FK_6800b0529ef82b072a4a4ae0737"`,
    );
    await queryRunner.query(`DROP TABLE "prices"`);
  }
}
