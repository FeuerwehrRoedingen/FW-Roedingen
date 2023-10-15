import React from "react"

import type { MatrixEntry } from "./bingo"
import { eventSource } from "./events"

export default function() {

  const [events, setEvents] = React.useState<MatrixEntry[]>();

  React.useEffect(() => {
    
  }, []);

  return (
    <div>

    </div>
  )
}