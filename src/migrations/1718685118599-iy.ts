import {MigrationInterface, QueryRunner} from "typeorm";

export class iy1718685118599 implements MigrationInterface {
    name = 'iy1718685118599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "stock" SET DEFAULT '10'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "stock" DROP DEFAULT`);
    }

}
