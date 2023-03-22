import React from 'react'

interface TooltipProps {
  children: React.ReactNode
  text: string
  className?: string
}

export const Tooltip = ({
  children,
  text,
  className = ''
}:TooltipProps) => {
  return (
    <div className='relative group grid place-items-center'>
      <span className='absolute group-hover:visible group-hover:opacity-100 opacity-0 invisible transition-opacity delay-300 text-xs font-bold bg-neutral-800 text-white px-2 py-1.5 rounded-sm -top-full -translate-y-4 left-1/2 -translate-x-1/2 shadow-lg whitespace-nowrap'>{text}</span>
      {children}
    </div>
  )
}
