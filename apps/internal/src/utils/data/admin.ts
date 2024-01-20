
import { fetchApi } from './api'

export async function getAllBorrows() : Promise<any[]> {
  const res = await fetchApi('/borrow');
  return res.json();
}

export async function getBorrowById(id: string) {
  const res = await fetchApi(`/borrow/${id}`);
  return res.json();
}