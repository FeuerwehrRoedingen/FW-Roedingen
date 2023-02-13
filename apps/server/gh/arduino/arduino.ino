
#define UP1   2 
#define STOP1 3 
#define DOWN1 4 

#define UP2   5 
#define STOP2 6 
#define DOWN2 7 

#define UP3   8 
#define STOP3 9 
#define DOWN3 10 

#define LED 13

void setup() {
  pinMode(UP1, OUTPUT);
  pinMode(STOP1, OUTPUT);
  pinMode(DOWN1, OUTPUT);

  pinMode(UP2, OUTPUT);
  pinMode(STOP2, OUTPUT);
  pinMode(DOWN2, OUTPUT);

  pinMode(UP3, OUTPUT);
  pinMode(STOP3, OUTPUT);
  pinMode(DOWN3, OUTPUT);
  
  pinMode(LED, OUTPUT);
  Serial1.begin(9600);
}


class State {
  pin_size_t up_pin;
  PinStatus up_state;
  
  pin_size_t stop_pin;
  PinStatus stop_state;
  
  pin_size_t down_pin;
  PinStatus down_state;

  size_t gate_num;

public:
  State(pin_size_t up, pin_size_t stop, pin_size_t down, size_t gate)
    : up_pin(up),
      up_state(LOW),
      stop_pin(stop),
      stop_state(LOW),
      down_pin(down),
      down_state(LOW),
      gate_num(gate){
    digitalWrite(up_pin, LOW);
    digitalWrite(stop_pin, LOW);
    digitalWrite(down_pin, LOW);
  }
  ~State(){}

  void up(){
    Serial1.print("UP:");
    Serial1.print(gate_num);
    if(up_state == LOW){
      up_state = HIGH;
      digitalWrite(up_pin, HIGH);
      Serial1.println(":HIGH");
    } else {
      up_state = LOW;
      digitalWrite(up_pin, LOW);
      Serial1.println(":LOW");
    }
  }
  void stop(){
    Serial1.print("STOP:");
    Serial1.print(gate_num);
    if(stop_state == LOW){
      stop_state = HIGH;
      digitalWrite(stop_pin, HIGH);
      Serial1.println(":HIGH");
    } else {
      stop_state = LOW;
      digitalWrite(stop_pin, LOW);
      Serial1.println(":LOW");
    }
  }
  void down(){
    Serial1.print("DOWN:");
    Serial1.print(gate_num);
    if(down_state == LOW){
      down_state = HIGH;
      digitalWrite(down_pin, HIGH);
      Serial1.println(":HIGH");
    } else {
      down_state = LOW;
      digitalWrite(down_pin, LOW);
      Serial1.println(":LOW");
    }
  }
};


void loop() {

  State MTF{UP1, STOP1, DOWN1, 1};
  State HLF{UP2, STOP2, DOWN2, 2};
  State GW {UP3, STOP3, DOWN3, 3};


  if(Serial1.available()){
    digitalWrite(13, HIGH);
    String gate    = Serial1.readString();
    String command = Serial1.readString();
    gate.trim();
    command.trim();

    State *state_ptr = nullptr;

    if(gate == "MTF"){
      state_ptr = &MTF;
    } 
    else if(gate == "HLF"){
      state_ptr = &HLF;
    } 
    else if(gate == "GW"){
      state_ptr = &GW;
    }

    if(command == "UP"){
      state_ptr->up();
    }
    else if(command == "STOP"){
      state_ptr->stop();
    }
    else if(command == "DOWN"){
      state_ptr->down();
    }
    
    digitalWrite(LED, LOW);
  }
}
