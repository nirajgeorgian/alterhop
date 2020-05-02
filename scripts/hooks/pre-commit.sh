#!/bin/sh
#
# Created on Sat May 02 2020
#
# Base hook setup before push
#
# @authors nirajgeorgian@oojob.io (Niraj Kishore)
#
# Copyright (c) 2020 - oojob

# Specify the directory for the hooks.
# We'll use the current one (.githooks)
hookDir=$(dirname $0)

# Specify the hooks you want to run during
# the post-commit process:
"$hookDir/hooks/run-tests.sh"

# $? stores exit value of the last command
if [ $? -ne 0 ]; then
 echo "Tests must pass before commit!"
 exit 1
fi