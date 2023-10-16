import { IValueType } from "./bingo";

const events = [
  "BMA bei HG-Frischgemüse",
  "Helm im Spind vergessen",
  "Erstes Feuer",
  "TM Lehrgang abgeschlossen",
  "Sprechfunker Lehrgang abgeschlossen",
  "Atemschutzgeräteträger Lehrgang abgeschlossen",
  "Stiefel geputzt",
  "Kamerad hat Geburtstag und muss die Getränke zahlen",
  "Bewohner fragen, ob die \"richtige\" Feuerwehr auch noch kommt",
  "Akku vom Funkgerät leer",
  "Niemand hat ein Funkgerät dabei",
  "Falsche Adresse angefahren",
  "TH-0 ÖLSPUR",
  "TH-0 Wasser im Keller",
  "TH-0 Baum auf Straße",
  "Der Gruppenführer hat es sich gewagt die Leitstelle anzurufen, ohne Status 5 zu drücken ->Leitstelle sauer",
  "Ausversehen den Notrufknopf gedrückt",
  "Der Maschinist hat die Pumpe heiß laufen lassen",
  "Die Schaumzumischanlage ist mal wieder kaputt",
  "Man kommt als erstes HLF am Einsatzort an, will als erster Angriffstrupp rein, aber der neue ist mal wieder langsam und man wird Sicherheitstrupp",
  "Das MTF ist wieder als zweites Fahrzeug zum Einsatz gefahren ->GW-L2 traurig",
  "C-Dienst kommt in Privatkleidung zum Einsatz",
  "Die Jugendfeuerwehr hat vergessen das Auto zu putzen",
  "Anwohner beschweren sich, was der ganze Lärm soll",
  "Die Polizei ist vor uns am Einsatzort, spaß das passiert nie",
  "Deine Nomex Klamotten sind noch in der Reinigung -> ab in den Schlauchtrupp",
  "Kein Einsatz für die feuerwehr, alle Einsatzkräfte wieder einrücken",
  "Deine einheit bekommt ein nagelneues Fahrzeug :) ...in 10 Jahren... vielleicht",
  "\"Dann gehen wir mal zum gemütlichen Teil des Übungsabends über\"",
  "Zugabsicherung im Ort",
  "Der Einsatzmonitor ist mal wieder im ladebildschirm hängen geblieben",
  "Kamerad kommt mitten in de Nacht nur in Unterhose zum Einsatz",
  "Der Melder geht während du auf der Toilette bist",
  "Der meldet geht während du unter der Dusche stehst",
  "Der Melder geht während du auf der Arbeit bist",
  "Der Melder geht während du im Urlaub bist",
  "Feuerwehrfest der Nachbarwehr -> viel trinken ist wichtig",
  "Feuerwehrfest der eigenen Wehr",
  "Die Gerätewarte haben das Fahrzeug wieder umgeräumt",
  "Der neue Maschinist bekommt das Fahrzeug nicht in die Garage",
  "Der neue Maschinist hat das Fahrzeug in die Garage bekommen, aber die Tür nicht mehr auf",
  "Du kommst in der Kleiderkammer an und es stehen bereits 20 Kameraden vor dir",
  "Du kommst nach den Weihnachtsfeiertagen wieder zum Übungsdienst und fragst dich wer deine Klamotten zu heiß gewaschen hat",
  "Du bist mit deinem Lieblingskameraden im Angriffstrupp",
  "Das Fahrzeug ist mal wieder nicht vollgetankt",
  "Die Einheit rückt ein, alle haben ihre Gerätehausschlüssel im Spind gelassen :)",
  "Dir ist langweilig und du starrst deinen Melder an bis er losgeht........ natürlich geht er nicht los",
  "Du kommst mittags in der Woche als einziger zur Ölspur",
  "Du hast die Ehre nach dem Einsatz alle Geräte und Schläuche zu tauschen",
  "Schlauchkegeln, weil keiner geradeaus werfen kann",
  "Knoten und Stiche als Übungsthema",
]

export const eventMap = events.map((event, index) => { 
  return {name: event, id: index+1}
});

export function get25randomEvents(){
  const shuffled = eventMap.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 25);
}

type ICallbackType = ((entry: IValueType) => void);

class EventEmitter {

  #Callbacks: ICallbackType[] = [];

  on(callback: ICallbackType) {
    this.#Callbacks.push(callback);
  }

  off(callback: ICallbackType) {
    this.#Callbacks = this.#Callbacks.filter(cb => cb !== callback);
  }

  emit(entry: IValueType) {
    this.#Callbacks.forEach(callback => callback(entry));
  }
}

export const eventEmitter = new EventEmitter();

export function createSession(){
  const sessionEvents = eventMap.map(event => event).sort(() => 0.5 - Math.random());

  const getEvent = () => {
    return sessionEvents.pop();
  }
  
  return {
    sessionEvents,
    getEvent
  }
}

let timer: NodeJS.Timeout;
let isPaused: boolean = false;

export function start(from: number, to: number) {
  isPaused = false;

  if(timer)
    return;

  const {
    sessionEvents,
    getEvent
  } = createSession();

  timer = setInterval(() => {
    if(isPaused)
      return;

    const event = getEvent();
    if(!event) {
      stop();
      return;
    }
    eventEmitter.emit(event);
  }, from + Math.random() * (to - from));
}
export function stop() {
  clearTimeout(timer);
}
export function pause() {
  isPaused = true;
}