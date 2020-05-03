#!/bin/sh
#
# Created on Sat May 02 2020
#
# Base hook setup before push
#
# @authors nirajgeorgian@oojob.io (Niraj Kishore)
#
# Copyright (c) 2020 - oojob

# if any command inside script returns error, exit and return that error 
set -e

# magic line to ensure that we're always inside the root of our application,
# no matter from which directory we'll run script
# thanks to it we can just enter `./scripts/run-tests.bash`
cd "${0%/*}/.."

# let's fake failing test for now 
echo "Running linting ......"
npm run lint         # JS lint config

echo "Running test ......"
npm run test         # JS unit tests