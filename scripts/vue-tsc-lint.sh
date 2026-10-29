#!/bin/bash -e

# Type-checks only the staged Vue files.
# Writes a temporary tsconfig that extends the main one and includes only the given files.

TMP=.tsconfig-vue-lint.json

# Start the temporary config
cat >$TMP <<EOF
{
  "extends": "./tsconfig.json",
  "include": [
EOF

# Add the files passed as arguments
for file in "$@"; do
  echo "    \"$file\"," >> $TMP
done

# Close the include array
cat >>$TMP <<EOF
    "**/*.d.ts"
  ]
}
EOF

# Run vue-tsc with the temporary config
npx vue-tsc --project $TMP --noEmit --skipLibCheck

# Remove the temporary config
rm -f $TMP 