#!/bin/bash -e

# Скрипт для проверки только staged Vue файлов
# Создает временный tsconfig.json который extends основной и включает только переданные файлы

TMP=.tsconfig-vue-lint.json

# Создаем начало файла
cat >$TMP <<EOF
{
  "extends": "./tsconfig.json",
  "include": [
EOF

# Добавляем переданные файлы
for file in "$@"; do
  echo "    \"$file\"," >> $TMP
done

# Закрываем массив include
cat >>$TMP <<EOF
    "**/*.d.ts"
  ]
}
EOF

# Запускаем vue-tsc с временным конфигом
npx vue-tsc --project $TMP --noEmit --skipLibCheck

# Удаляем временный файл
rm -f $TMP 