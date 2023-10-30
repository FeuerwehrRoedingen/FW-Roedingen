
import { Spinner } from "@nextui-org/react"

export default function() {

  return(
    <div className="w-screen h-screen bg-background">
      <div className="z-10 relative w-full h-full flex items-center justify-center">
        <Spinner size='lg' color='danger'/>
      </div>
  </div>
  )
}
