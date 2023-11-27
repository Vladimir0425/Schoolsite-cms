import { useState } from 'react'
import {
  FaPhone,
  FaClock,
  FaLocationDot,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6'
import { Button } from '@/components/commons/Button'
import { Logo } from '../layout/Logo'

import { HttpService } from '@/services'

interface LinkItem {
  name: string
  href: string
}

const FooterLinks: LinkItem[] = [
  { name: 'About', href: '#' },
  { name: 'Approach', href: '#' },
  { name: 'Schedule a Meeting', href: '#' },
  { name: 'Is Atlas Right for My Child', href: '#' },
  { name: 'Events', href: '#' },
  { name: 'Calendar', href: '#' },
  { name: 'Our News', href: '#' },
  { name: 'Admissions', href: '#' },
  { name: 'Foundation', href: '#' },
]

interface IContact {
  name: string
  email: string
  class: string
  message: string
}

const initialContact: IContact = {
  name: '',
  email: '',
  class: '',
  message: '',
}

export function Footer() {
  const [joinContact, setJoinContact] = useState<IContact>(initialContact)

  const onContactSubmit = () => {
    if (Object.values(joinContact).every((item) => item === '')) return
    const body = { ...joinContact, type: 'joining' }
    HttpService.post('/message', body).then((res) => {
      setJoinContact(initialContact)
    })
  }

  const onContactUpdate = (field: string) => (e: any) => {
    setJoinContact({
      ...joinContact,
      [field]: e.target.value,
    })
  }

  return (
    <div className="mx-auto max-w-[1151px] px-[15px]">
      <div className="bg-gradient-to-r from-[#FDC830] to-[#F37335] rounded-[40px] w-full px-[98px] py-[59px] grid grid-cols-1 md:grid-cols-6">
        <div className="min-w-[192px]  md:col-span-2">
          <p className="font-poppins font-bold text-[36px] text-[#2B2B2B]">
            Join us
          </p>
          <p className="font-poppins font-bold text-[36px] text-[#2B2B2B] mt-[-13px]">
            and stay tuned
          </p>
          <Button content="Join Us" isLeft={true} onClick={onContactSubmit} />
        </div>
        <div className="mt-[39px] md:col-span-4">
          <div className="justify-between gap-x-3 grid grid-cols-1 gap-y-5 md:grid-cols-3">
            <input
              value={joinContact.name}
              className="px-[15px] py-[7px] rounded-[39px] outline-none italic opacity-50"
              placeholder="Name"
              onChange={onContactUpdate('name')}
            />
            <input
              value={joinContact.email}
              className="px-[15px] py-[7px] rounded-[39px] outline-none italic opacity-50"
              placeholder="Email"
              onChange={onContactUpdate('email')}
            />
            <input
              value={joinContact.class}
              className="px-[15px] py-[7px] rounded-[39px] outline-none italic opacity-50"
              placeholder="Class"
              onChange={onContactUpdate('class')}
            />
          </div>
          <div className="mt-[20px]">
            <textarea
              value={joinContact.message}
              placeholder="Message"
              className="w-full h-[70px] opacity-50 rounded-[20px] px-[15px] py-[7px] outline-none  italic"
              onChange={onContactUpdate('message')}
            />
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 gap-y-5 px-[20px] md:grid-cols-2 md:gap-y-5 lg:grid-cols-4 mt-[67px] mb-[20px] pb-[67px] border-b-2">
        <div className="max-w-[287px]">
          <Logo />
          <p>
            Vivamus porta efficitur nibh nec convallis. Vestibulum egestas
            eleifend justo. Ut tellus ipsum, accumsan
          </p>
        </div>
        <div className="max-w-[200px]">
          <div className="flex gap-x-5 items-center">
            <span className="w-5 h-5 flex rounded-full items-center justify-center bg-[#0E6BA8] shrink-0">
              <FaPhone fill="white" className="w-[12px] h-[12px]" />
            </span>
            <div>
              <p className="text-[#2B2B2B] text-[14px]">Call</p>
              <p className="text-[12px] font-open-sans font-bold">
                501 222 2252
              </p>
            </div>
          </div>
          <div className="flex gap-x-5 items-center">
            <span>
              <FaClock className="w-5 h-5" fill="#0E6BA8" />
            </span>
            <div>
              <p className="text-[#2B2B2B] text-[14px]">Work Time</p>
              <p className="text-[12px] font-open-sans font-bold">
                Mon - Fri 8 AM - 5 PM
              </p>
            </div>
          </div>
          <div className="flex gap-x-5 items-center">
            <span>
              <FaLocationDot className="w-5 h-5" fill="#0E6BA8" />
            </span>
            <div>
              <p className="text-[#2B2B2B] text-[14px]">Address</p>
              <p className="text-[12px] font-open-sans font-bold">
                Franklin St, Greenpoint Ave
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-[180px] flex flex-col">
          <p className="font-poppins font-medium text-[18px]">Quick Links</p>
          {FooterLinks.map((item) => (
            <a key={item.name} className="font-poppins font-medium text-[14px]">
              {item.name}
            </a>
          ))}
        </div>
        <div className="max-w-[273px] h-[200px] w-[273px] bg-[#D8D8D8]"></div>
      </div>
      <div className="grid grid-cols-1 gap-y-3 px-[20px] py-10 lg:grid-cols-3 justify-between items-center">
        <span className="text-sm text-gray-600 font-open-sans">
          &copy; 2023 Atlas Academics All rights reserved
        </span>
        <div>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-150 font-open-sans font-medium"
          >
            Terms of Service
          </a>
          <span className="mx-2">/</span>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-150 font-open-sans font-medium"
          >
            Privacy Policy
          </a>
        </div>
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
