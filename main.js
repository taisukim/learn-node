var http = require("http");
var fs = require("fs");
var app = http.createServer(function(req, res){
    var url = req.url;
    console.log(__dirname + url + " : before 경로당");
    if(req.url == "/"){
        url = "/index.html";
    }
    if(req.url == "/favicon.ico"){
        return res.writeHead(404);
    }else{
        url = "/web1-html-internet" + url;
    }
    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + url));
    console.log(__dirname + url);
});

app.listen(3000);