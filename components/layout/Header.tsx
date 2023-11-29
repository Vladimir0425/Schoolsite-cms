import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaClock,
  FaLocationDot,
  FaAngleDown,
  FaXmark,
} from 'react-icons/fa6'
import { FaBars } from 'react-icons/fa'
import { Button } from '@/components/commons/Button'
import { Logo } from './Logo'

import { useOnClickOutside } from '@/utils/hook/useOnClickOutside'

interface RouteItem {
  id: number
  title: string
  src: string
  children?: RouteItem[]
}

const routeItems: RouteItem[] = [
  {
    id: 0,
    title: 'Home',
    src: '/home',
  },
  {
    id: 1,
    title: 'About',
    src: '/about',
  },
  {
    id: 2,
    title: 'Approach',
    src: '/approach',
  },
  {
    id: 3,
    title: 'Learn More',
    src: '/learn-more',
    children: [
      {
        id: 0,
        title: 'Schedule a meeting',
        src: '/schedule',
      },
      {
        id: 1,
        title: 'Is Atlas Right for My Child',
        src: '/adjust',
      },
      {
        id: 2,
        title: 'Events',
        src: '/events',
      },
      {
        id: 3,
        title: 'School Calendar',
        src: '/calendar',
      },
    ],
  },
  {
    id: 4,
    title: 'News',
    src: '/news',
  },
  {
    id: 5,
    title: 'Admissions',
    src: '/admissions',
  },
  {
    id: 6,
    title: 'Foundation',
    src: '/foundation',
  },
  {
    id: 7,
    title: 'Contacts',
    src: '/contacts',
  },
]

export function Header() {
  const router = useRouter()
  const pathname = router.pathname
  const [isLearnMenu, setIsLearnMenu] = useState<boolean>(false)
  const [isResLearnMenu, setIsResLearnMenu] = useState<boolean>(false)
  const [isSidebar, setIsSidebar] = useState<boolean>(false)

  const sidebarRef = useRef<HTMLUListElement>(null)
  const subNavbarRef = useRef<HTMLDivElement>(null)

  const navigate = (path: string) => {
    router.push(path)
  }

  const closeSidebar = () => {
    setIsSidebar(false)
    setIsResLearnMenu(false)
  }

  const onWindowResize = (e: UIEvent) => {
    if (window.innerWidth > 925) {
      setIsSidebar(false)
      setIsResLearnMenu(false)
    }
  }

  const onLearnMoreClick = (path: string) => () => {
    navigate(path)
    setIsLearnMenu(false)
  }

  const onNavItemClick = (item: any) => () => {
    if (!item.children) {
      navigate(item.src)
      setIsSidebar(false)
    }
  }

  const onLearnNavClick = (item: any, childItem: any) => () => {
    navigate(`${item.src}${childItem.src}`)
    setIsSidebar(false)
  }

  useEffect(() => {
    window.addEventListener('resize', onWindowResize)
    useOnClickOutside(subNavbarRef, () => setIsLearnMenu(false), 'mousedown')
    useOnClickOutside(sidebarRef, () => setIsSidebar(false), 'mousedown')

    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  }, [])

  return (
    <div className="max-w-[1151px] mx-auto mt-[10px] mb-[25px] w-full">
      <div className="flex items-center sm:justify-between mt-[10.3px] mb-[37.4px] font-poppins font-medium sm:mx-[15px]">
        <Logo />
        <div className="hidden sm:flex gap-x-5 items-center">
          <span className="w-7 h-7 flex rounded-full items-center justify-center bg-[#F69B03] shrink-0">
            <FaPhone fill="white" />
          </span>
          <div>
            <p className="text-[#2B2B2B] text-[14px]">Call</p>
            <p className="text-[12px] text-[#575757]">954-324-7837</p>
          </div>
        </div>
        <div className="hidden sm:flex gap-x-5 items-center">
          <span>
            <FaClock className="w-[28px] h-[28px]" fill="#F69B03" />
          </span>
          <div>
            <p className="text-[#2B2B2B] text-[14px]">Work Time</p>
            <p className="text-[12px] text-[#575757]">Mon - Fri 8 AM - 5 PM</p>
          </div>
        </div>
        <div className="hidden sm:flex gap-x-5 items-center">
          <span>
            <FaLocationDot className="w-[28px] h-[28px]" fill="#F69B03" />
          </span>
          <div>
            <p className="text-[#2B2B2B] text-[14px]">Address</p>
            <p className="text-[12px] text-[#575757]">
              23123 State Road 7, Suite 107, Boca Raton, FL 33428
            </p>
          </div>
        </div>
      </div>
      <div className="mmd:hidden flex pr-4 items-center">
        <FaBars
          onClick={() => setIsSidebar(true)}
          className="mx-[15px] w-[32px] h-[32px] cursor-pointer"
          fill="#135E9E"
        />
        <Button
          content="Apply"
          onClick={() => navigate('/admissions')}
          className="mt-0 grow"
        />
      </div>
      <div
        className={`fixed top-0 left-0 h-full z-10 w-full flex transform transition-transform duration-300 ease-in-out -translate-x-full ${
          isSidebar ? 'translate-x-0' : ''
        } mmd:hidden`}
      >
        <ul
          className={`bg-[#f08741] w-[400px] h-full font-poppins font-medium text-white text-[18px]`}
          ref={sidebarRef}
        >
          <li className="pl-[15px] pt-[15px] cursor-pointer">
            <span onClick={closeSidebar}>
              <FaXmark className="w-[30px] h-[30px]" />
            </span>
          </li>
          {routeItems.map((item) => (
            <li
              key={item.id}
              className="pl-[20px] py-[15px] border-b-[1px] border-[#ffffff65] cursor-pointer"
              onClick={onNavItemClick(item)}
            >
              {!item.children ? (
                <a className="">{item.title}</a>
              ) : (
                <div>
                  <p
                    className="flex items-center"
                    onClick={() => setIsResLearnMenu(!isResLearnMenu)}
                  >
                    {item.title}
                    <span
                      className={`ml-[10px] transition-all duration-300 transform ${
                        isResLearnMenu ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      <FaAngleDown />
                    </span>
                  </p>
                  <ul
                    className={`max-h-0 overflow-hidden duration-700 ease-in-out ${
                      isResLearnMenu ? 'max-h-[500px]' : ''
                    }`}
                  >
                    {item.children.map((childItem) => (
                      <li
                        className="pt-[15px] pl-[10px]"
                        key={childItem.id}
                        onClick={onLearnNavClick(item, childItem)}
                      >
                        <a className="">{childItem.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden mmd:flex items-center justify-between mx-[15px]">
        <ul className="flex md:gap-x-5">
          {routeItems.map((item) => (
            <li key={item.id}>
              {!item.children ? (
                <span
                  className={`relative text-[#2B2B2B] text-[17px] lg:text-xl font-poppins font-medium cursor-pointer after:block after:absolute after:content-[''] after:bottom-0 after:w-full hover:after:h-1 after:bg-gradient-custom-130 after:from-[#F7B500] after:to-[#155799] after:rounded-sm after:bg-transparent ${
                    pathname === item.src ? 'after:h-1 font-black' : ''
                  }`}
                  onClick={() => navigate(item.src)}
                >
                  {item.title}
                </span>
              ) : (
                <div className="relative" ref={subNavbarRef}>
                  <p
                    className="text-[#2B2B2B] text-[17px] lg:text-xl font-poppins font-medium flex items-center gap-x-1 cursor-pointer after:block after:absolute after:content-[''] after:bottom-0 after:w-full hover:after:h-1 after:bg-gradient-custom-130 after:from-[#F7B500] after:to-[#155799] after:rounded-sm after:bg-transparent"
                    onClick={() => setIsLearnMenu(!isLearnMenu)}
                  >
                    {item.title}
                    <span
                      className={`transition-all duration-300 transform ${
                        isLearnMenu ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      <FaAngleDown />
                    </span>
                  </p>
                  <ul
                    className={`absolute z-50 shadow-[0_5px_10px_#15579914] px-[14.57px] py-[23.85px] min-w-[308.82px] rounded-[25px] transition-all duration-300 ease-in-out transform ${
                      isLearnMenu
                        ? 'bg-white opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-5'
                    }`}
                  >
                    {item.children.map((childItem) => (
                      <li
                        key={`child-${childItem.id}`}
                        onClick={onLearnMoreClick(
                          `${item.src}${childItem.src}`
                        )}
                        className="flex gap-x-3 items-center"
                      >
                        <div className="w-[8px] h-[8px] rounded-[8px] bg-gradient-to-b from-[#FDC830] to-[#F37335] shrink-0"></div>
                        <span
                          className={clsx(
                            'text-[#2B2B2B] text-[19px] font-poppins font-medium cursor-pointer',
                            pathname.endsWith(childItem.src) ? 'font-bold' : ''
                          )}
                          onClick={() => {}}
                        >
                          {childItem.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-x-3">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            className="bg-[#3365A6] rounded-full w-6 h-6 flex items-center justify-center cursor-pointer transform transition-all hover:scale-110 duration-300"
          >
            <FaFacebookF fill="white" fontSize={12} />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            className="bg-[#3365A6] rounded-full w-6 h-6 flex items-center justify-center cursor-pointer transform transition-all hover:scale-110 duration-300"
          >
            <FaLinkedinIn fill="white" fontSize={12} />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            className="bg-[#3365A6] rounded-full w-6 h-6 flex items-center justify-center cursor-pointer transform transition-all hover:scale-110 duration-300"
          >
            <FaInstagram fill="white" fontSize={12} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Header
