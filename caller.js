var jf = require('jsonfile')
var util = require('util')

var file = '/home/root/data.json'
jf.readFile(file, function(err, obj) {
  console.log(obj);
  report(obj.temp, obj.light);
})

var report = function(temperature, light) {
var http = require('http');
var url = "salty-thicket-3644.herokuapp.com";
//var temperature = 25.4;
//var light = 87.23;

var options = {
      host: url,
      port: 80,
      path: '/arduino/send_data?device_id=tiny_disruptor&temp=' + temperature + '&light=' + light,
      method: 'POST'
};

http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
}).end();
};
