#!/bin/bash
export $(grep -v '^#' project.env | xargs)

docker build --tag $COMPOSE_PROJECT_NAME .

