import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitTables1717057799771 implements MigrationInterface {
  name = 'CreateInitTables1717057799771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "wallet_address" character varying NOT NULL, "signature" character varying, "description" text, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_196ef3e52525d3cd9e203bdb1de" UNIQUE ("wallet_address"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "price_history" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "price" numeric(20,10) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "poolId" integer, CONSTRAINT "PK_e41e25472373d4b574b153229e9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "team_members" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "position" character varying(255), "social_links" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "poolId" integer, CONSTRAINT "PK_ca3eae89dcf20c9fd95bf7460aa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ecosystem" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "website" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "poolId" integer, CONSTRAINT "PK_517b34d569a9bbecf1fd93e8fcf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pool_details" ("id" SERIAL NOT NULL, "curator_name" character varying(255) NOT NULL, "curator_comments" text, "duration_start_date" TIMESTAMP, "duration_end_date" TIMESTAMP, "token_vesting_start" TIMESTAMP, "token_vesting_end" TIMESTAMP, "cliff_date" TIMESTAMP, "cliff_end_date" TIMESTAMP, "start_weight" numeric(5,2), "end_weight" numeric(5,2), "starting_balances" numeric(20,2), "current_balances" numeric(20,2), "project_token_release" numeric(20,2), "swap_fee" numeric(20,2), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "poolId" integer, CONSTRAINT "REL_1251eeb9aeac2920c4148f930f" UNIQUE ("poolId"), CONSTRAINT "PK_51fdeda499caa3a1f5fdb8419da" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "trades" ("id" SERIAL NOT NULL, "trade_type" character varying(50) NOT NULL, "trade_amount" numeric(20,10) NOT NULL, "trade_price" numeric(20,10) NOT NULL, "trade_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "poolId" integer, CONSTRAINT "PK_c6d7c36a837411ba5194dc58595" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pools" ("id" SERIAL NOT NULL, "project_name" character varying NOT NULL, "ticker" character varying NOT NULL, "participants" integer NOT NULL, "funds_raised" numeric(18,8) NOT NULL, "live_until" TIMESTAMP, "status" character varying NOT NULL, "opens_on" TIMESTAMP, "chain" character varying NOT NULL, "start_date" TIMESTAMP, "curator" character varying, "social_links" jsonb, "token_vesting" boolean, "lbp_type" character varying, "about" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6708c86fc389259de3ee43230ee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "prices" ("id" SERIAL NOT NULL, "current_price" numeric(20,10) NOT NULL, "market_cap" numeric(20,2), "liquidity" numeric(20,2), "pool_value" numeric(20,2), "fdv" numeric(20,2), "volume" numeric(20,2), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "poolId" integer, CONSTRAINT "PK_2e40b9e4e631a53cd514d82ccd2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "price_history" ADD CONSTRAINT "FK_589a70dedd0adbed325894aabed" FOREIGN KEY ("poolId") REFERENCES "pools"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_members" ADD CONSTRAINT "FK_7163128b586d23333417cc803de" FOREIGN KEY ("poolId") REFERENCES "pools"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ecosystem" ADD CONSTRAINT "FK_ec1207266746e80a060f27e24e7" FOREIGN KEY ("poolId") REFERENCES "pools"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pool_details" ADD CONSTRAINT "FK_1251eeb9aeac2920c4148f930fb" FOREIGN KEY ("poolId") REFERENCES "pools"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trades" ADD CONSTRAINT "FK_d08e847c2caf655e17e66b68f10" FOREIGN KEY ("poolId") REFERENCES "pools"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "prices" ADD CONSTRAINT "FK_6800b0529ef82b072a4a4ae0737" FOREIGN KEY ("poolId") REFERENCES "pools"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prices" DROP CONSTRAINT "FK_6800b0529ef82b072a4a4ae0737"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trades" DROP CONSTRAINT "FK_d08e847c2caf655e17e66b68f10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pool_details" DROP CONSTRAINT "FK_1251eeb9aeac2920c4148f930fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ecosystem" DROP CONSTRAINT "FK_ec1207266746e80a060f27e24e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_members" DROP CONSTRAINT "FK_7163128b586d23333417cc803de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price_history" DROP CONSTRAINT "FK_589a70dedd0adbed325894aabed"`,
    );
    await queryRunner.query(`DROP TABLE "prices"`);
    await queryRunner.query(`DROP TABLE "pools"`);
    await queryRunner.query(`DROP TABLE "trades"`);
    await queryRunner.query(`DROP TABLE "pool_details"`);
    await queryRunner.query(`DROP TABLE "ecosystem"`);
    await queryRunner.query(`DROP TABLE "team_members"`);
    await queryRunner.query(`DROP TABLE "price_history"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
