import { useUser } from '@auth0/nextjs-auth0/client'

export default function() {
  const { user, error, isLoading } = useUser()
  

  //TODO handle Error

  return {
    user,
    isLoading,
  }
}