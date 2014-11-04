
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
			var titles = select(dom, 'tbody');
	                sys.puts("Table body:");
	                titles.forEach(function(title) {
	                	sys.puts("- " + title.children[0].raw + " [" + title.attribs.align + "]\n");
			})
	        }
	});
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(body);
);
}
