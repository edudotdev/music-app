import React from 'react'
import styles from './input.module.css'

interface InputProps {
  label: string
  onChange: (event:any) => void
}

export const Input = ({
  label,
  onChange
}:InputProps) => {
  return (
    <div className='relative'>
      <input className={styles.input} onChange={onChange} type="text" placeholder=' ' required />
      <label htmlFor="" className={styles.label}>{label}</label>
    </div>
  )
}
