import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateApplications1629846454634 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "applications",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "candidate_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "vacancy_id",
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
      "applications",
      new TableForeignKey({
        name: "FKCandidateApplication",
        referencedTableName: "candidates",
        referencedColumnNames: ["id"],
        columnNames: ["candidate_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "applications",
      new TableForeignKey({
        name: "FKVacancyApplication",
        referencedTableName: "vacancies",
        referencedColumnNames: ["id"],
        columnNames: ["vacancy_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("applications");
  }
}
