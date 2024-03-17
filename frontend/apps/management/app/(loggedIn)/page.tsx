import { redirect } from 'next/navigation'

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

type IProps = {}

async function page({}: IProps) {
  redirect('/dashboard');
  return <></>;
}

export default withPageAuthRequired(page, {
  returnTo: '/dashboard',
});