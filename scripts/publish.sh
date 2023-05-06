#!/bin/bash

current_version=$(grep -Eo '"version": "[^"]+"' package.json | sed 's/"version": "//;s/"//')
last_commit_version=$(git show HEAD:package.json | grep -Eo '"version": "[^"]+"' | sed 's/"version": "//;s/"//')

echo $current_version
echo $last_commit_version

if [[ "$current_version" == "$last_commit_version" ]]; then
  echo "The version has not changed"
  exit 1
else
  echo "The version has changed. Publishing"
  npm publish --dry-run
fi
