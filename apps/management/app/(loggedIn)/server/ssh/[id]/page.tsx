import React from 'react'

import { Terminal } from 'xterm'

type IProps = {
  params: {id: string}
}

export default async function page(props: IProps) {

  const termRef = React.useRef<HTMLDivElement>(null);
  const term = new Terminal();


  React.useEffect(() => {
    if (termRef.current) {
      term.open(termRef.current);
      term.write(`Hello from ${props.params.id} $ `)
    }
  }, []);

  return (
    <div className='h-screen w-screen flex content-center justify-center'>
      <div ref={termRef}/>
    </div>
  )
}
