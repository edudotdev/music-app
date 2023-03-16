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
    <div className={`rounded-md bg-blue-500 absolute z-[99] left-1/2 -translate-x-1/2 bottom-[125px] transition-all duration-300 ${textInfo.active? 'py-3 px-5 visible bottom-[137px] opacity-100': 'py-0 px-0 invisible opacity-0'} ${className}`}>
      <span className='text-white font-semibold'>
        {textInfo.text}
      </span>
    </div>
  )
}
