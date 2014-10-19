/*
/* Grove - Light Sensor demo v1.0
* 
* signal wire to A0.
* By: http://www.seeedstudio.com
*/
//#include <Process.h>
#include <math.h>
const int ledPin=13;                 //Connect the LED Grove module to Pin12, Digital 12
const int thresholdvalue=10;         //The treshold for which the LED should turn on. 
float Rsensor; //Resistance of sensor in K

int a;
float temperature;
int B=3975;                  //B value of the thermistor
float resistance;
boolean on = false;
void setup() {
  Serial.begin(9600);                //Start the Serial connection
  pinMode(ledPin,OUTPUT);            //Set the LED on Digital 12 as an OUTPUT
}
void loop() {
  int sensorValue = analogRead(0); 
  Rsensor=(float)(1023-sensorValue)*10/sensorValue;
  /*if(Rsensor>thresholdvalue)
  {
    digitalWrite(ledPin,HIGH);
  }
  else
  {
  digitalWrite(ledPin,LOW);
  }*/
  Serial.println("the analog read data is ");
  Serial.println(sensorValue);
  Serial.println("the sensor resistance is ");
  Serial.println(Rsensor,DEC);//show the ligth intensity on the serial monitor;
  
  a=analogRead(0);
  resistance=(float)(1023-a)*10000/a; //get the resistance of the sensor;
  temperature=1/(log(resistance/10000)/B+1/298.15)-273.15;//convert to temperature via datasheet ;
  //runCurl(Rsensor);
  FILE *fp;
  fp=fopen("/home/root/data.json", "w");
  fprintf(fp, "{\"light\":\"%f\", \"temp\":\"%f\"}",Rsensor, fabsf(temperature));
  fclose(fp);
  if(!on){
    digitalWrite(ledPin, HIGH);
    on = true;
  } else {
    digitalWrite(ledPin, LOW);
    on = false;
  }
  delay(10);

}

/*void runCurl(float lightValue) {
  // Launch "curl" command and get Arduino ascii art logo from the network
  // curl is command line program for transferring data using different internet protocols
  Process p;        // Create a process and call it "p"
  p.begin("curl");  // Process that launch the "curl" command
  p.addParameter("http://salty-thicket-3644.herokuapp.com/arduino/send_data?device_id=tiny_disruptor&temp=25&light=" + lightValue); // Add the URL parameter to "curl"
  p.run();      // Run the process and wait for its termination

  // Print arduino logo over the Serial
  // A process output can be read with the stream methods
  while (p.available()>0) {
    char c = p.read();
    Serial.print(c);
  }
  // Ensure the last bit of data is sent.
  Serial.flush();
}*/
