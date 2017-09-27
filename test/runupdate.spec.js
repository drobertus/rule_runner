let assert = require('assert');

let app = require('../lib/zk-client')

describe('ZooKeeper publish', function() {
  console.log('1')
  describe('when a value is changed in zk', function() {
    console.log('2')
    it('the running application should be updated quickly', function() {
      console.log('3')
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});