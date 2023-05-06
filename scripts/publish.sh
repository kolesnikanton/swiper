#!/bin/bash

current_version=$(grep -Eo '"version": "[^"]+"' package.json | sed 's/"version": "//;s/"//')
last_commit_version=$(npm info @antonkolesnik/swiper version)

echo $current_version
echo $last_commit_version

if [[ "$current_version" == "$last_commit_version" ]]; then
  echo "The version has not changed"
else
  echo "The version has changed. Publishing"
  npm publish --dry-run
fi
