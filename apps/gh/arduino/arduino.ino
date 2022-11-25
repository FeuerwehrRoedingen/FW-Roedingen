
#define LED 13

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if(Serial.available()){
    String res = Serial.readString();
    res.trim();

    Serial.print("received: ");
    Serial.println(res);

    if(res == "on"){
      digitalWrite(LED, HIGH);
    } else if(res == "off"){
      digitalWrite(LED, LOW);
    } else {
      digitalWrite(LED, HIGH);
      delay(200);
      digitalWrite(LED, LOW);
      delay(200);
      digitalWrite(LED, HIGH);
      delay(200);
      digitalWrite(LED, LOW);
    }
  }
}
