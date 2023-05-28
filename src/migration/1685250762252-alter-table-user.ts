import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUser1685250762252 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE public.user ADD unique(email);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE public.user DROP CONSTRAINT user_email_key;
        `);
  }
}
