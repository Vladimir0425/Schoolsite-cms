import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import { useState } from 'react'
import {
  FaPhone,
  FaClock,
  FaLocationDot,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6'

import GoogleMapReact from 'google-map-react'

import { Button } from '@/components/commons/Button'
import { Logo } from '@/components/layout/Logo'

import { HttpService } from '@/services'

interface LinkItem {
  name: string
  href: string
}

const FooterLinks: LinkItem[] = [
  { name: 'About', href: '/about' },
  { name: 'Approach', href: '/approach' },
  { name: 'Schedule a Meeting', href: '/learn-more/schedule' },
  { name: 'Is Atlas Right for My Child', href: '/learn-more/adjust' },
  // { name: 'Events', href: '/learn-more/events' },
  // { name: 'Calendar', href: '/learn-more/calendar' },
  // { name: 'Our News', href: '/news' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Foundation', href: '/foundation' },
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
  const googleMapProps = {
    center: {
      lat: 26.3324684,
      lng: -80.2088306,
    },
    zoom: 17,
  }

  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [joinContact, setJoinContact] = useState<IContact>(initialContact)

  const navigate = (path: string) => {
    router.push(path)
  }

  const onContactSubmit = () => {
    if (Object.values(joinContact).every((item) => item === '')) {
      enqueueSnackbar('Input correct information!', { variant: 'warning' })
      return
    }
    const body = { ...joinContact, type: 'joining' }
    HttpService.post('/message', body)
      .then((res) => {
        setJoinContact(initialContact)
        enqueueSnackbar('Successfully Sent!', { variant: 'success' })
      })
      .catch((err) => {
        enqueueSnackbar('Error occured while joining!', { variant: 'error' })
      })
  }

  const onContactUpdate = (field: string) => (e: any) => {
    setJoinContact({
      ...joinContact,
      [field]: e.target.value,
    })
  }

  return (
    <div className="mx-auto max-w-screen-container px-4 container:px-0 w-full">
      <div className="bg-gradient-to-r from-[#FDC830] to-[#F37335] rounded-[40px] w-full px-4 md:px-[98px] py-[59px]  grid grid-cols-1 mmd:grid-cols-3">
        <div className="min-w-[192px] md:col-span-1">
          <p className="font-poppins font-bold text-[36px] text-[#2B2B2B]">
            Join us
          </p>
          <p className="font-poppins font-bold text-[36px] text-[#2B2B2B] mt-[-13px]">
            and stay tuned
          </p>
          <div className="w-[180px]">
            <Button content="Join Us" isLeft={true} onClick={onContactSubmit} />
          </div>
        </div>
        <div className="mt-[39px] md:col-span-2">
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
      <div className="w-full grid grid-cols-1 gap-y-5 px-[20px] sm:grid-cols-2 md:gap-y-5 lg:grid-cols-5 mt-[67px] mb-[20px] pb-[67px] border-b-2">
        <div className="max-w-[400px] lg:col-span-2">
          <Logo />
          <p className="text-sm">
            Atlas Academics is a part of a larger microschool movement across
            Florida, providing an alternative to families unsatisfied with
            traditional school options. We focus on mastery-based learning, life
            abilities, critical thinking, encouraging curiosity, maturing grit
            through failure, and real-world application of knowledge.
          </p>
        </div>
        <div className="max-w-[200px] lg:col-span-1">
          <div className="flex gap-x-5 items-center">
            <span className="w-5 h-5 flex rounded-full items-center justify-center bg-[#0E6BA8] shrink-0">
              <FaPhone fill="white" className="w-[12px] h-[12px]" />
            </span>
            <div>
              <p className="text-[#2B2B2B] text-[14px]">Call</p>
              <p className="text-[12px] font-open-sans font-bold">
                954-324-7837
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
                23123 State Road 7, Suite 107, Boca Raton, FL 33428
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-[180px] flex flex-col lg:col-span-1">
          <p className="font-poppins font-medium text-[18px]">Quick Links</p>
          {FooterLinks.map((item) => (
            <p
              key={item.name}
              className="font-poppins font-medium text-[14px] cursor-pointer hover:underline"
              onClick={() => navigate(item.href)}
            >
              {item.name}
            </p>
          ))}
        </div>
        <div className="max-w-[273px] h-[200px] w-[273px] lg:col-span-1">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyAUR1UE9x-Kp71L0SG6OHBmBNY-__JpbNM',
            }}
            center={googleMapProps.center}
            zoom={googleMapProps.zoom}
            yesIWantToUseGoogleMapApiInternals
          ></GoogleMapReact>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-3 px-[20px] py-10 lg:grid-cols-3 justify-between items-center">
        <span className="text-sm text-gray-600 font-open-sans">
          &copy; 2023 Atlas Academics All rights reserved
        </span>
        <div>
          <a
            href="/terms-of-service"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-150 font-open-sans font-medium"
          >
            Terms of Service
          </a>
          <span className="mx-2">/</span>
          <a
            target="_black"
            href="/private-policy"
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
