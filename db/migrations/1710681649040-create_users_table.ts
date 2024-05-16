import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1710681649040 implements MigrationInterface {
    name = 'CreateUsersTable1710681649040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'public_address',
                    type: 'varchar',
                },
                {
                    name: 'nonce',
                    type: 'varchar',
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
