var express = require('express');
var mongo = require('mongodb');
var monk = require('monk');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
 res.render('latencychart', {
        selected: 'latencychart',
		title: 'Geo Replication using Mongo API Support',
		subtitle: 'Powered by Azure DocumentDB'
    });
});

/* GET regions data. */
router.get('/regions', function(req, res) {
	var connstr = 'mongodemovishi:N3rSZw2zbXKmvy4Dc8BH4fphy9YCoxesncWBbPLNKB0IGLz7cs57DISQ1U9Fx1D27H70JTd13hboxDUXD03tmw==@mongodemovishi.documents.azure.com:10250/nodetest/?ssl=true';
	var db = monk(connstr);
	var coll = db.get('demometrics');
	coll.find({type : "regionInfo"},{fields: {region:1, iswriteregion:1}}).then((docs) => {		
		res.json(docs);
	});
	
});

/* GET acc regions data. */
router.get('/accregions', function(req, res) {
	var connstr = 'mongodemovishi:N3rSZw2zbXKmvy4Dc8BH4fphy9YCoxesncWBbPLNKB0IGLz7cs57DISQ1U9Fx1D27H70JTd13hboxDUXD03tmw==@mongodemovishi.documents.azure.com:10250/nodetest/?ssl=true';
	var db = monk(connstr);
	var coll = db.get('demometrics');
	coll.find({type : "AccRegionInfo"},{fields: {regions:1}}).then((docs) => {		
		res.json(docs);
	});
	
});

/* GET latency chart  */
router.get('/latencychart', function(req, res, next) {
    res.render('latencychart', {
        selected: 'latencychart',
		title: 'Mongo Geo Demo'
    });
});

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/* GET latency data for each region */
router.get('/regionlatencydata', function(req, res) {
	var rval = getParameterByName('regionName', req.originalUrl);
	var connstr = 'mongodemovishi:N3rSZw2zbXKmvy4Dc8BH4fphy9YCoxesncWBbPLNKB0IGLz7cs57DISQ1U9Fx1D27H70JTd13hboxDUXD03tmw==@mongodemovishi.documents.azure.com:10250/nodetest/?ssl=true';
	var db = monk(connstr);
	var coll = db.get('demometrics');
	coll.find({type : "latencyInfo", region: rval},{fields: {region: 1, readLatency:1, writeLatency:1, _id:1}, limit: 100, sort: {_id: -1}}).then((docs) => {		
		res.json(docs);
	});
	
});

router.get('/map', function(req,res) {
	res.render('map', {
        selected: 'map'
    });
});


/* GET readme file  */
router.get('/readme', function(req, res, next) {
    res.render('readme');
});
module.exports = router;
