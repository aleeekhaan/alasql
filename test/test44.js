if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 43', function() {
	describe('Dates', function(){

		alasql('CREATE TABLE orders (orderid INT, orderdate DATE)');

		var data = alasql.tables.orders.data;
		data.push({orderid:1, orderdate: new Date(2014,1,1)});
		data.push({orderid:2, orderdate: new Date(2012,0,5)});
		data.push({orderid:3, orderdate: new Date(2014,0,1)});
		data.push({orderid:4, orderdate: new Date(2014,0,3)});
		data.push({orderid:5, orderdate: new Date(2013,10,12)});
		data.push({orderid:6, orderdate: new Date(2014,3,28)});
		data.push({orderid:7, orderdate: new Date(2014,7,6)});
		data.push({orderid:8, orderdate: new Date(2013,10,12)});

		it('Order by dates ASC', function(done){
			var res = alasql.queryArray("SELECT orderdate FROM orders ORDER BY orderdate");

			var ok = res[0]<=res[1] &&
				res[1]<=res[2] &&
				res[2]<=res[3] &&
				res[3]<=res[4] &&
				res[4]<=res[5] &&
				res[5]<=res[6] &&
				res[6]<=res[7];

			assert.equal(true, ok);
			done();
		});

		it('Order by dates DESC', function(done){
			var res = alasql.queryArray("SELECT orderdate FROM orders ORDER BY orderdate DESC");

			var ok = 
				res[0]>=res[1] &&
				res[1]>=res[2] &&
				res[2]>=res[3] &&
				res[3]>=res[4] &&
				res[4]>=res[5] &&
				res[5]>=res[6] &&
				res[6]>=res[7];

			assert.equal(true, ok);
			done();
		});


		it('Dates parsing in INSERT', function(done){
			alasql("INSERT INTO orders VALUES (10,'2015-10-20')");

			var res = alasql.queryValue('SELECT orderdate FROM orders WHERE orderid = 10');
			assert.equal(res.valueOf(), new Date("2015-10-20").valueOf());
			done();
		});

/*
		it('Dates parsing in SELECT', function(done){
			db.exec("SELECT orders VALUES (10,'2015-10-20')");

			var res = db.queryValue('SELECT orderdate FROM orders WHERE orderid = 10');
			assert.equal(res.valueOf(), new Date("2015-10-20").valueOf());
			done();
		});
*/

	});
});
