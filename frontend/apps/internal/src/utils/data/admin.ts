
import { fetchApi } from './api'

export type Borrow = {
  id: number;
  returnedAt: string|null;
  borrowedAt: string;
  userId: number;
  items: {
    id: number;
    amount: number;
    returned: boolean;
    itemId: number;
    borrowId: number;
    item: {
      id: number;
      name: string;
      description: string;
      image: string;
      quantity: number;
    }
  }[]
}

export async function getAllBorrows() : Promise<Borrow[]> {
  const res = await fetchApi('/borrow');
  return res.json();
}

export async function getBorrowById(id: string): Promise<Borrow> {
  const res = await fetchApi(`/borrow/${id}`);
  return res.json();
}
