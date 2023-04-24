import { redirect } from 'next/navigation'

type Props = {}

export default async function(props: Props) {
  redirect('/home');
}
