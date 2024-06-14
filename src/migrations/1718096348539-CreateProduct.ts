import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProduct1718096348539 implements MigrationInterface {
    name = 'CreateProduct1718096348539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "description" DROP NOT NULL`);
    }

}
