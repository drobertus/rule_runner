#!/usr/bin/env bash

# docker cli
docker run -it --rm --link some-zookeeper:zookeeper zookeeper zkCli.sh -server zookeeper