
#!/bin/sh

file_name=$1

current_time=$(date +%Y%m%d%H%M%S)

new_fileName=${current_time}"__"${file_name}"__migration.ts"
echo "Migration generated FileName: " "$new_fileName"
touch "src/db/migrations/"$new_fileName
cat >  "src/db/migrations/"$new_fileName <<EOF
import { DataType } from 'sequelize-typescript';
import { QueryInterface } from 'sequelize/types';

export async function up(query: QueryInterface) {
  /*
    Add altering commands here.

    Example:
    await query.createTable('users', { id: DataType.INTEGER });
    console.log('Table users created!');
  */
}

export async function down(query: QueryInterface) {
  /*
    Add reverting commands here.

    Example:
    await query.dropTable('users');
    console.log('Table users dropped!');
  */
}
EOF
