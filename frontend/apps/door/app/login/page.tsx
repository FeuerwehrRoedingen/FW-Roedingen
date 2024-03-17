import { Button, Link } from '@nextui-org/react'

export default function() {

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form className="w-1/2 h-1/2 border border-silver rounded-lg flex flex-col">
        <div className="w-full h-1/2 flex items-center justify-center">
          <h1 className="text-[100px]">FWR-Door</h1>
        </div>
        <div className="w-full h-1/4 flex flex-col justify-center items-center">
          <p>Warning this application is intended for members of the Firedepartment Rödingen</p>
          <p>Unauthorized access is prohibited and will be logged!</p>
        </div>
        <div className="w-full h-1/4 flex flex-col justify-center items-center">
          <Button
            as={Link} 
            href="/api/auth/login"
            color='primary'
          >
            Login with auth0
          </Button>
        </div>
      </form>
    </div>
  )
}
