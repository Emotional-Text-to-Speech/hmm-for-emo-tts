// var http = require('http');
// var fs = require('fs');
// var url = require('url');
// var express = require('express');
// var formidable = require('formidable');
// var mysql = require('mysql');
// var bodyParser = require('body-parser')
// const { exec } = require("child_process");
// const delay = require('delay');

// var app = express()
// app.use(bodyParser.json());
// app.use(express.static(__dirname));

// // function sleep(ms) {
// //     return new Promise(resolve => setTimeout(resolve, ms));
// // }
// // }

// app.post('/getvoice', function(req, res){
//   var data = req.body;
//   console.log(data);
//   var command = './flite/bin/flite -voice voices/' + data['emotion'] + '.flitevox --setf duration_stretch=' + data['stretch'] + ' -t ' + '"' + data['text'] + '"' + ' test.wav';
//   console.log(command)
 
//   exec(command, (error, stdout, stderr) => {
//     console.log(error);
//   });
//  res.status(200);
// });


// app.get('/', function (request, response) {  
   
//    fs.readFile('index.html', function (err, data) {
//       if (err) {
//          //console.log(err);
//          response.writeHead(404, {'Content-Type': 'text/html'});
//       }else {	
        
//          response.writeHead(200, {'Content-Type': 'text/html'});	
//          response.write(data.toString());		
//       }
//       response.end();
//    });   
// });


// app.listen(5050, '0.0.0.0', function() {
//     console.log('Listening to port:  ' + 5050);
// });





var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var formidable = require('formidable');
var mysql = require('mysql');
var bodyParser = require('body-parser')
const { exec } = require("child_process");
const delay = require('delay');

var app = express()
app.use(bodyParser.json());
app.use(express.static(__dirname));

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.post('/getvoice', function(req, res){
  var data = req.body;
  console.log(data);
  var command = './flite/bin/flite -voice voices/' + data['emotion'] + '.flitevox --setf duration_stretch=' + data['stretch'] + ' -t ' + '"' + data['text'] + '"' + ' test.wav';
   console.log(command);
  exec(command, (error, stdout, stderr) => {
res.sendStatus(200);

  });

 
});


app.get('/', function (request, response) {  
   
   fs.readFile('index.html', function (err, data) {
      if (err) {
         //console.log(err);
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else {
       
         response.writeHead(200, {'Content-Type': 'text/html'});
         response.write(data.toString());
      }
      response.end();
   });  
});


app.listen(5050, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 5050);
});

