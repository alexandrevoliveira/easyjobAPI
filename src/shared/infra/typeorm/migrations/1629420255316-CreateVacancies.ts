import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateVacancies1629420255316 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "vacancies",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "role",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "type",
            type: "varchar",
          },
          {
            name: "area",
            type: "varchar",
          },
          {
            name: "requirements",
            type: "varchar",
            isArray: true,
            isNullable: true,
          },
          {
            name: "salary",
            type: "numeric",
          },
          {
            name: "quantity",
            type: "numeric",
            isNullable: false,
          },
          {
            name: "company_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "vacancies",
      new TableForeignKey({
        name: "FKCompanyVacancy",
        referencedTableName: "companies",
        referencedColumnNames: ["id"],
        columnNames: ["company_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("vacancies");
  }
}
