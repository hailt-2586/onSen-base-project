import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTeamMembersTable1716973052736 implements MigrationInterface {
  name = 'CreateTeamMembersTable1716973052736';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "team_members" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "position" character varying(255), "social_links" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "poolId" integer, CONSTRAINT "PK_ca3eae89dcf20c9fd95bf7460aa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_members" ADD CONSTRAINT "FK_7163128b586d23333417cc803de" FOREIGN KEY ("poolId") REFERENCES "pools"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "team_members" DROP CONSTRAINT "FK_7163128b586d23333417cc803de"`,
    );
    await queryRunner.query(`DROP TABLE "team_members"`);
  }
}
