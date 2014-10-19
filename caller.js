var jf = require('jsonfile')
var util = require('util')

var deviceIDs = ["tiny_disruptor", "little_giant", "nimble_sprout", "shiny_seed", "saucy_root", "kingly_leaf", "curly_thistle", "picky_prickle", "thorny_velvet", "springy_pollen"];
var baseInterval = 1000;
var requestCount = 1;


var totalRequests = 672*deviceIDs.length;

// ------------------------- FUNCTION DEFINITIONS END -------------------------

var getJson = function(){
  var file = '/home/root/data.json'
  jf.readFile(file, function(err, obj) {
    //console.log(obj);
    var dayRequest = 1;
    var rising = true;
    for(var dayRequestCount = 0; dayRequestCount <= 9; dayRequestCount++){
      var pon = random(1,5);
      var differenceTemp = 0, differenceLight = 0;
      if((5-pon) > (pon-1)){
        differenceTemp = random(-2, 0);
        differenceLight = random(-5, 0);
      } else {
        differenceTemp = random(0, 2);
        differenceLight = random(0, 5);
      }
      obj.temp = (obj.temp - 0) + (differenceTemp - 0);
      obj.light = (obj.light - 0) + (differenceLight - 0);

      if(rising == true){
        obj.temp += 2;
        obj.light += 10;
        dayRequest++;
      } else {
        obj.temp -= 2;
        obj.light -= 10;
        dayRequest--;
      }

      if(dayRequest == 5) {
        rising = false;
      } else if (dayRequest == 0) {
        rising = true;
      }

      console.log("\t\tApplying differenceLight: " + differenceLight + ", differenceTemp: " + differenceTemp);
      console.log("\t\tTemp: " + obj.temp + ", Light: " + obj.light + (rising == true ? " RISING" : " LOWERING"));
      console.log("dayRequest:" + dayRequest);
      requestCount++;
    }
    console.log("requestCount:" + requestCount);
    
    //report(obj.temp, obj.light);
  });
};

var report = function(temperature, light) {
  var http = require('http');
  var url = "salty-thicket-3644.herokuapp.com";

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

// ------------------------- FUNCTION DEFINITIONS END -------------------------

deviceIDs.forEach(function(deviceID){
  console.log("Current request count: " + requestCount);

  console.log("\tPosting as " + deviceID);
  getJson();

});

var random = function (low, high) {
    return Math.random() * (high - low) + low;
}


