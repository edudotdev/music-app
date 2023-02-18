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
  
  const styleDefault = 'font-semibold pl-6 py-4 flex gap-4 items-center hover:bg-neutral-600/20'
  const styles = 'text-gray-300'
  const styleActive = 'relative text-blue-200 overflow-hidden before:absolute before:w-1.5 before:h-9 before:right-0 before:rounded-l-lg before:top-1/2 before:-translate-y-1/2 before:bg-blue-500'

  return (
    <Link 
      className={`${styleDefault} ${styles} ${router.asPath === to? styleActive : styles }`} 
      href={to}>
        {children}
        <span>{text}</span>
    </Link>
  )
}
