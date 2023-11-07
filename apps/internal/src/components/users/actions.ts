"use server"
import { fetchApi } from "utils/api";
import type { UserCreate } from "types/user";

export type FormState = {
  error?: Error;
  message: string;
}

export async function handleCreate(state: FormState, formData: FormData) {

  const password = formData.get('password') as string;
  const password_repeat = formData.get('password_confirm') as string;

  if(password !== password_repeat)
    return {
      error: {
        message: 'Passwörter stimmen nicht überein',
        name: 'PasswordError'
      },
      message: ''
    }

  const userCreate: UserCreate = {
    email: formData.get('email') as string,
    phone_number: formData.get('phone_number') as string,
    user_metadata: {},
    app_metadata: {},
    given_name: formData.get('given_name') as string,
    family_name: formData.get('family_name') as string,
    picture: formData.get('picture') as string,
    connection: 'Username-Password-Authentication',
    password: formData.get('password') as string,
  }

  const response = await fetchApi('/user', {
    method: 'POST',
    body: JSON.stringify(userCreate),
  });

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