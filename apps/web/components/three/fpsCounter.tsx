import React from 'react'
import { useAppSelector } from 'store'

export default () => {

  const showFPS = useAppSelector(state => state.options.showFPS);
  const fps = useAppSelector(state => state.fps.fps);

  return (
    <div className='relative z-10 top-3 right-3 text-green-400' hidden={!showFPS}>
      <h1>{fps}</h1>
    </div>
  )
}
