'use strict';
//import RuleHandler from '../lib/rule_handler'
let rh = require('../lib/rule_handler')
let assert = require('assert');
let _ = require('lodash')

let rules = [
	{
    "condition": function(R) {
        R.when(this && (this.transactionTotal < 500));
    },
    "consequence": function(R) {
        this.result = false;
        R.stop();
    }
	},
	{
		"condition": function(R) {
			R.when(this.)
		}
	}

];

//sample fact to run the rules on
let fact = {
    "name":"user4",
    "application":"MOB2",
    "transactionTotal":4800,
    "cardType":"Credit Card",
};

let handler

describe("create a RuleHandler", () => {

	before(function(done) {
		handler = new rh.RuleHandler(rules)
		done()
	})

	it("and throw some data at it that passes", () => {

		 handler.runRule(_.clone(fact), function(res) {
		 console.log('should pass', res)
     		assert(res, "result should be true")
		 })

	})

		it("and throw some data at it that fails", () => {
  		let fact2 = _.clone(fact)
  		fact2.transactionTotal = 400
  		console.log('--1')
  		handler.runRule(fact2, function(res){
  			console.log('--2', res)
        		assert(!res, "result should be false")
  		})

  	})

//  	it.only("promised based call", (done) => {
//console.log('promising!')
//  		let fact2 = _.clone(fact)
//  		fact2.transactionTotal = 200
//  		handler.promisedRule(fact2)
//  		.then(function(data) {
//        console.log('res ===== ', data)
//    			assert(!res, "result should be false")
//    			done();
//  		})
  	//	.then( (res) =>{

			//})
//  	})
})