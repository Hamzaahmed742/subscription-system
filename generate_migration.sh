
#!/bin/sh

file_name=$1

current_time=$(date +%Y%m%d%H%M%S)

new_fileName=${current_time}"__"${file_name}"__migration.ts"
echo "Migration generated FileName: " "$new_fileName"
touch "migrations/"$new_fileName
