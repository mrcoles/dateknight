#!/usr/bin/env bash

set -ex

cd web/

npm run build

scp -r build/* pcoles:/home/pcoles/webapps/dateknight/
