import { useActionInfoStore } from "@/store/actionInfoStore"
import { useEffect, useState } from "react"
import { shallow } from "zustand/shallow"

interface ActionInfoProps {
  className?: string
}

export const ActionInfo = ({
  className,
}:ActionInfoProps) => {
  const [timer, setTimer] = useState<any>(null)

  const {textInfo} = useActionInfoStore((state) => ({
    textInfo: state.textInfo
  }), shallow)
  const {setTextInfo} = useActionInfoStore()

  useEffect(() => {
    if (Boolean(setTextInfo.length)) {
      clearTimeout(timer)
      const newTimer = setTimeout(() => {
        setTextInfo({
        text: textInfo.text,
          active: false
        })
      }, 3000)
      setTimer(newTimer)
    }
  }, [textInfo])

  return (
    <div className={`rounded-md bg-blue-500 absolute z-[9999] left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity duration-300 ${textInfo.active? 'py-2.5 px-4 visible !bottom-[190px] md:!bottom-[148px] lg:!bottom-[112px] opacity-100': 'invisible py-0 px-0 opacity-0'} ${className}`}>
      <span className='text-white font-semibold text-sm lg:text-base'>
        {textInfo.text}
      </span>
    </div>
  )
}
