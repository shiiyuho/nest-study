import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1718177496269 implements MigrationInterface {
    name = 'CreateUser1718177496269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

}
