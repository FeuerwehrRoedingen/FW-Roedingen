import React from 'react'

type Props = {
  className?: string;
  href?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export function Indicator(props: Props) {

  const _className = props.className || '';
  const _href      = props.href      || '';

  const _top       = props.top    ? `top-[${props.top}]`       : '';
  const _left      = props.left   ? `left-[${props.left}]`     : '';
  const _right     = props.right  ? `right-[${props.right}]`   : '';
  const _bottom    = props.bottom ? `bottom-[${props.bottom}]` : '';

  return (
    <div className={`relative ${_top} ${_left} ${_right} ${_bottom} ${_className}`}>
      <div className='h-4 w-4 rounded-full bg-white opacity-50'>
        <a href={_href}/>
      </div>
    </div>
  )
}
