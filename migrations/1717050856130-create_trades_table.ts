import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTradesTable1717050856130 implements MigrationInterface {
  name = 'CreateTradesTable1717050856130';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "trades" ("id" SERIAL NOT NULL, "trade_type" character varying(50) NOT NULL, "trade_amount" numeric(20,10) NOT NULL, "trade_price" numeric(20,10) NOT NULL, "trade_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "poolId" integer, CONSTRAINT "PK_c6d7c36a837411ba5194dc58595" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "trades" ADD CONSTRAINT "FK_d08e847c2caf655e17e66b68f10" FOREIGN KEY ("poolId") REFERENCES "pools"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trades" DROP CONSTRAINT "FK_d08e847c2caf655e17e66b68f10"`,
    );
    await queryRunner.query(`DROP TABLE "trades"`);
  }
}
