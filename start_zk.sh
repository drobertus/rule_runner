docker run -p 2181:2181 -p 2888:2888 -p 3888:3888 --name some-zookeeper --restart always -d zookeeper

# docker cli
docker run -it --rm --link some-zookeeper:zookeeper zookeeper zkCli.sh -server zookeeper

