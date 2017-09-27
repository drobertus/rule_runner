var zookeeper = require('node-zookeeper-client');
let config = require('config')

let ld = require('./loaded_data')
console.log('config.zoo_keeper', config.get('zoo_keeper'));
let client = zookeeper.createClient(config.get('zoo_keeper')); //'localhost:2181');
//var path = process.argv[2];
var path = "/zk_test"

function getData(path) {
   //return function(path){ 
       client.getData(
        path,
        function (event) {
                    console.log('Got event: %s.', event);
                    console.log('type, name, path ', event.type, event.name, event.getPath())
                    if (event.name ===  'NODE_DATA_CHANGED') {
                        getData(event.getPath())
                    }
                },
                function (error, data, stat) {
                    if (error) {
                        console.log(error.stack);
                        return;
                    }
            
                   console.log('Got data from %s: %s', path, data.toString('utf8'));
                });
   // }
}


function listChildren(client, path) {
    console.log('listing children')
    client.getChildren(
        path,
        function (event) {
            console.log('Got watcher event: %s', event);
            listChildren(client, path);
        },
        function (error, children, stat) {
            if (error) {
                console.log(
                    'Failed to list children of %s due to: %s.',
                    path,
                    error
                );
                return;
            }

            console.log('Children of %s are: %j.', path, children);
             
            for (var child of children) {
                let pathVar = path + '/' + child
                getData(pathVar)

                // client.getData(
                // pathVar,
                // function (event) {
                //     console.log('Got event: %s.', event);
                //     if (event.getType === Event.NODE_DATA_CHANGED) {

                //     }
                // },
                // function (error, data, stat) {
                //     if (error) {
                //         console.log(error.stack);
                //         return;
                //     }
            
                //    console.log('Got data from %s: %s', pathVar, data.toString('utf8'));
                // });
            };
        }
    );
}
        


client.once('connected', function () {
    console.log('Connected to ZooKeeper.');
    listChildren(client, path);
});

client.connect();