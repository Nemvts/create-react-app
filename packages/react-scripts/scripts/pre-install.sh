#!/usr/bin/env bash
set -e

# Prevent using 'npm install'
parent_command=$(ps $PPID | tail -n 1 | awk "{print \$5}")
if [[ $parent_command = 'npm' ]]; then
    echo -e "***************************************************************"
    echo -e "Must use 'yarn'. See yarn cheat sheet:"
    echo -e "https://shift.infinite.red/npm-vs-yarn-cheat-sheet-8755b092e5cc"
    echo -e "***************************************************************\n"
    exit 1
fi
exit 0
