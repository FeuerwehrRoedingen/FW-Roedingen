import { useUser } from "@auth0/nextjs-auth0/client"
import handleError from "utils/handleError"

export default function() {
  const { user, error, isLoading } = useUser();
  
  if(error) {
    handleError(error);
  }

  return {
    user,
    isLoading
  }
}