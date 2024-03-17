
import { useUser } from '@auth0/nextjs-auth0/client'

import handleError from 'utils/handler/handleError'

export default function() {
  const { checkSession, error, isLoading, user } = useUser();

  if (error) {
    handleError(error);
  }

  if (isLoading) {
    return {
      checkSession: null,
      isLoading: true,
      user: null,
    }
  }

  return { checkSession, isLoading, user };
}
