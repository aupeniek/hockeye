
var select = require('soupselect').select;
var htmlparser = require("htmlparser");
var http = require('http');
var sys = require('sys');

var request = require("request");
 
request({
    uri: "http://espn.go.com/nhl/statistics/team/_/stat/scoring/sort/avgShots/year/2014",
}, function(error, response, body) {
	//now we have the whole body, parse it and select the nodes we want...
	var handler = new htmlparser.DefaultHandler(function(err, dom) {
	        if (err) {
			sys.debug("Error: " + err);
		} else {
			// soupselect happening here...
			var tbody = select(dom, 'table.tablehead');
			sys.puts("Table body:" + sys.inspect(tbody));
			
			var rows = select(tbody, 'tr');
			rows.forEach(function(row) {
				sys.puts(sys.inspect(row.children[1].children[0]) + "\t");
				//sys.puts(row.children[1].children[0].raw);
				var team = select(row, 'a');
				sys.puts(sys.inspect(team.children[0]) + "\t");
			})
		}
	});
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(body);
	//sys.puts(sys.inspect(handler.dom, false, null));
});
