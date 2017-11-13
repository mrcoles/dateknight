#!/usr/bin/env bash

dir=./web/src/data/
files=( "formats.json" "langs.json" )

mkdir -p $dir

for file in "${files[@]}"; do
    new_file="${dir}$(basename "$file" .json).js"
    echo "creating $new_file"
    echo 'export default ' > $new_file
    cat $file >> $new_file
done
