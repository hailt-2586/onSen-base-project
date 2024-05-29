import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEcosystemsTable1716976267525 implements MigrationInterface {
  name = 'CreateEcosystemsTable1716976267525';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ecosystem" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "website" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "poolId" integer, CONSTRAINT "PK_517b34d569a9bbecf1fd93e8fcf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ecosystem" ADD CONSTRAINT "FK_ec1207266746e80a060f27e24e7" FOREIGN KEY ("poolId") REFERENCES "pools"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ecosystem" DROP CONSTRAINT "FK_ec1207266746e80a060f27e24e7"`,
    );
    await queryRunner.query(`DROP TABLE "ecosystem"`);
  }
}
