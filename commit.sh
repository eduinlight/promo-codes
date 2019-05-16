#!/bin/bash
#git config credential.helper store
git add --all
git commit -m "$1"
git push origin master