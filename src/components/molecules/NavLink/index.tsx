import { useRouter } from 'next/router'
import Link from 'next/link'

interface NavLinkProps {
  children: React.ReactElement
  to: string
  text?:string
  variant: 'desktop' | 'mobile'
}

export const NavLink = ({
  children,
  to,
  text,
  variant
}:NavLinkProps) => {
  const router = useRouter()
  
  const styleDefault = 'font-semibold pl-6 py-4 text-sm flex gap-4 items-center hover:bg-neutral-600/20'
  const styleDefaultMobile = 'py-2 flex gap-2 items-center text-green-400 text-xs font-bold'

  const styles = 'text-neutral-200'

  const styleActive = 'relative text-white overflow-hidden before:absolute before:w-1 before:h-6 before:right-0 before:rounded-l-lg before:top-1/2 before:-translate-y-1/2 before:bg-green-500'

  return variant === 'desktop' ? (
    <Link 
      className={`${styleDefault}  ${router.asPath === to? styleActive : styles }`} 
      href={to}>
        {children}
        <span>{text}</span>
    </Link>
  ) :  
  <Link 
    className={`${styleDefaultMobile}`} 
    href={to}>
      {children}
      {router.asPath === to? <span>{text}</span> : null }
  </Link>
}
