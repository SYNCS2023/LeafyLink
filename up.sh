#!/bin/bash
export $(grep -v '^#' project.env | xargs)

_UID=$(id -u) _GID=$(id -g) docker-compose --env-file project.env up --detach

