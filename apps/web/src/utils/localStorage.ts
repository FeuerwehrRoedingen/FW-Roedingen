
export function set(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  }
  catch (error) {
    console.error(error);
  }
}

export function get(key: string) :any|null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } 
  catch (error) {
    console.error(error);
    return null;
  }
}
