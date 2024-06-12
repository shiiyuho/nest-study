import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateId1718178507784 implements MigrationInterface {
    name = 'CreateId1718178507784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "createUserId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "createUserId" SET NOT NULL`);
    }

}
