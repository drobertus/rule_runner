'use strict';
//const util = require('util');

let RuleEngine = require('node-rules');

//let RE = util.promisify(RuleEngine)
//import RuleEngine from 'node-rules'

// console.log('starting rules')

//define the rules
	let rules = [{
			 "condition": function(R) {
					 RuleEngine.when(this && (this.transactionTotal < 500));
			 },
			 "consequence": function(R) {
					 this.result = false;
					 RuleEngine.stop();
			 }
	 }];
//sample fact to run the rules on
//var fact = {
//    "name":"user4",
//    "application":"MOB2",
//    "transactionTotal":4800,
//    "cardType":"Credit Card",
//};

class RuleHandler {

	constructor(rules) {
		//initialize the rule engine
  	this.engine = new RuleEngine(rules);
  	//this.executer = util.promisify(this.engine.execute)
	}

	runRule (fact, cb)  {
  //Now pass the fact on to the rule engine for results
   return	this.engine.execute(fact, function(result){
   		console.log('result=', result)
   		cb(result.result);
	 	});
  }
//
//	promisedRule (fact) {
//		this.executer(fact)
//		.then((ruling) => {
//			console.log('ruling=', ruling)
//			return ruling
//		})
//		.catch((err) => {
//			console.log('err', err)
//			return err
//		})
//	}

}

module.exports.RuleHandler = RuleHandler

//exports.module.setRules = setRules(rules);