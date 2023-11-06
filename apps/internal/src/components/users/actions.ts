"use server"

export type FormState = {
  error?: Error;
  message: string;
}

export async function handleCreate(state: FormState, formData: FormData) {
  console.log('handleCreate', formData.get('nickname'));

  await delay(2000);
  return state;
}
export async function handleUpdate(state: FormState, formData: FormData) {
  console.log('handleUpdate', formData.get('nickname'));

  await delay(2000);
  return state;
}


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}