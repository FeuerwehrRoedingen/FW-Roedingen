
export function set(key: string, value: any) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  catch (error) {
    console.error(error);
  }
}

export function get(key: string) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } 
  catch (error) {
    console.error(error);
    return null;
  }
}