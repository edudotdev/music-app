import { useRouter } from 'next/router'
import Link from 'next/link'

interface NavLinkProps {
  children: React.ReactElement
  to: string
  text:string
}

export const NavLink = ({
  children,
  to,
  text
}:NavLinkProps) => {
  const router = useRouter()
  
  const styleDefault = 'font-semibold pl-6 py-4 text-sm flex gap-4 items-center hover:bg-neutral-600/20'
  const styles = 'text-neutral-200'
  const styleActive = 'relative text-white overflow-hidden before:absolute before:w-1 before:h-6 before:right-0 before:rounded-l-lg before:top-1/2 before:-translate-y-1/2 before:bg-green-500'

  return (
    <Link 
      className={`${styleDefault} ${styles} ${router.asPath === to? styleActive : styles }`} 
      href={to}>
        {children}
        <span>{text}</span>
    </Link>
  )
}
