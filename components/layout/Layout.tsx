import { Header } from './Header'
import { Footer } from './Footer'

interface ILayoutProps {
  pathname: string
  children?: React.ReactNode
}

export function Layout({ pathname, children }: ILayoutProps) {
  return (
    <div className="flex flex-col w-full">
      {!pathname.startsWith('/admin') && <Header />}
      {children}
      {!pathname.startsWith('/admin') && <Footer />}
    </div>
  )
}
