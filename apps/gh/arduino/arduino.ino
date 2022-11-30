
#define UP   2 
#define STOP 3 
#define DOWN 4 

void setup() {
  pinMode(UP, OUTPUT);
  pinMode(STOP, OUTPUT);
  pinMode(DOWN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if(Serial.available()){
    String res = Serial.readString();
    res.trim();

    Serial.print("received: ");
    Serial.println(res);

    if(res == "UP"){
      digitalWrite(UP, HIGH);
      delay(1000);
      digitalWrite(UP, LOW);

    } else if(res == "DOWN"){
      digitalWrite(DOWN, HIGH);
      delay(1000);
      digitalWrite(DOWN, LOW);
    } else if(res == "STOP"){
      digitalWrite(STOP, HIGH);
      delay(1000);
      digitalWrite(STOP, LOW);
    }
  }
}
