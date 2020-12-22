import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class CreateBusiness1608659398662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'business',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'description',
          type: 'varchar'
        },
        {
          name: 'types',
          type: 'enum',
          enum: ['receita', 'despesa']
        },
        {
          name: 'money',
          type: 'decimal',
          precision: 7,
          scale: 2
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }))

    await queryRunner.addColumn('business', new TableColumn({
      name: 'userId',
      type: 'int'
    }))

    await queryRunner.createForeignKey('business', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE'
    }))

    await queryRunner.addColumn('business', new TableColumn({
      name: 'goalId',
      type: 'int'
    }))

    await queryRunner.createForeignKey('business', new TableForeignKey({
      columnNames: ['goalId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'goals',
      onDelete: 'CASCADE'
    }))

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableUsers = await queryRunner.getTable('users');
    const tableGoals = await queryRunner.getTable('goals');

    const foreignKeyUsers = tableUsers!.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
    const foreignKeyGoals = tableGoals!.foreignKeys.find(fk => fk.columnNames.indexOf('goals') !== -1);

    await queryRunner.dropForeignKey('users', foreignKeyUsers!);
    await queryRunner.dropForeignKey('goals', foreignKeyGoals!);
    await queryRunner.dropColumn('users', 'userId');
    await queryRunner.dropColumn('goals', 'goalId');
    await queryRunner.dropTable('business');
  }

}
