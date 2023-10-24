
type Event = {
  name: string,
  from: Date,
  to: Date,
  description: string,
  location: string,
}

type Calendar = {
  name: string,
  events: Event[]
  sharedWith: string[]
}

const calendars: Calendar[] = [
  {
    name: 'Übungsdienst',
    events: [],
    sharedWith: [],
  }
]

export async function getCalendars(): Promise<Calendar[]> {
  return calendars;
}
export async function getEvents(calendar: string): Promise<Event[]> {
  for(const cal of calendars) {
    if(cal.name === calendar) {
      return cal.events;
    }
  }
  return [];
}
export async function addCalendar(calendar: Calendar): Promise<Calendar> {
  calendars.push(calendar);
  return calendar;
}
export async function addEvent(calendar: string, event: Event): Promise<Event|null> {
  for(const cal of calendars) {
    if(cal.name === calendar) {
      cal.events.push(event);
      return event;
    }
  }
  return null;
}
