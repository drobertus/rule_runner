var ZooKeeper = require ("zookeeper");
let instance = null;


// var zk = new ZooKeeper({
//   connect: "localhost:2181"
//  ,timeout: 20000
//  ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
//  ,host_order_deterministic: false
// })
//console.log('starting', zk)

// zk.connect(function (err) {
//     //console.log('this is an err-', err)
//     if(err) throw err;

// 		console.log ("zk session established, id=%s", zk.client_id);

// 		zk.a_create ( '/stop_2', 'bugger', ZooKeeper.ZOO_PERSISTENT, function(rc, err, path){

//     console.log('resp=====',rc, err, path)

//     zk.a_get("/zk_test", false, function(rc, error, stat, data) {
//    	 console.log('callback made!', rc, error	)
//       console.log("val=", getResponse(stat, data)) ;//data.toString("utf8", 0, stat.dataLength));
//     })

//     zk.a_get("/stop_2", false, function(rc, error, stat, data) {
//     console.log('callback made2', rc, error)
//       console.log("val2=",getResponse(stat, data));
// 			process.nextTick(function () {
//        zk.close ();
//     	})
//     })
//   });
// });

function connect() {
  if (! instance) {
      instance = new ZooKeeper(
        {
          connect: "localhost:2181"
          ,timeout: 20000
          ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
          ,host_order_deterministic: false
        })
  }
  instance.connect(function (err) {
    //console.log('this is an err-', err)
    if(err) throw err;

		console.log ("zk session established, id=%s", instance.client_id);

		instance.a_create ( '/stop_2', 'bugger', ZooKeeper.ZOO_PERSISTENT, function(rc, err, path){

    console.log('resp=====',rc, err, path)

    instance.a_get("/zk_test", false, function(rc, error, stat, data) {
   	 console.log('callback made!', rc, error	)
      console.log("val=", getResponse(stat, data)) ;//data.toString("utf8", 0, stat.dataLength));
    })

    instance.a_get("/stop_2", false, function(rc, error, stat, data) {
    console.log('callback made2', rc, error)
      console.log("val2=",getResponse(stat, data));
			process.nextTick(function () {
       instance.close ();
    	})
    })
  });
});
}


function getResponse(stat, data) {
	return data.toString("utf8", 0, stat.dataLength)
}
module.exports.connect = connect