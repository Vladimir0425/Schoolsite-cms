import { types } from 'react-bricks/frontend'
import { Text } from 'react-bricks/frontend'

import Image from 'next/image'
import { useState } from 'react'
import { FaPhone, FaLocationDot } from 'react-icons/fa6'
import GoogleMapReact from 'google-map-react'

import { Button } from '@/components/commons/Button'
import { Input } from '@/components/forms/Input'

import { HttpService } from '@/services'

import ClockIcon from '@/public/assets/approach/clock.svg'

const initialContact = {
  name: '',
  email: '',
  message: '',
}

interface IContactProps {}

const Contact: types.Brick<IContactProps> = () => {
  const [contact, setContact] = useState(initialContact)
  const googleMapProps = {
    center: {
      lat: 26.3324684,
      lng: -80.2088306,
    },
    zoom: 17,
  }

  const onContactUpdate = (field: string) => (value: any) => {
    setContact({ ...contact, [field]: value })
  }

  const onContactSubmit = () => {
    if (Object.values(contact).every((item) => item === '')) return
    const body = { ...contact, type: 'general' }
    HttpService.post('/message', body).then((res) => {
      setContact(initialContact)
    })
  }

  return (
    <div className="w-full mt-[140px] mb-[116px]">
      <div className="max-w-screen-container mx-auto w-full h-[450px] bg-[#D8D8D8] mb-10">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyAUR1UE9x-Kp71L0SG6OHBmBNY-__JpbNM',
          }}
          center={googleMapProps.center}
          zoom={googleMapProps.zoom}
          yesIWantToUseGoogleMapApiInternals
        ></GoogleMapReact>
      </div>
      <div className="px-4 container:px-0 max-w-screen-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="max-w-screen-sm lg:col-span-2">
            <h1 className="w-full font-open-sans font-normal text-[#2B2B2B] text-3xl mb-[24px]">
              Reach Out
            </h1>
            <div className="w-full flex gap-4 mb-[16px]">
              <Input
                value={contact.name}
                placeholder="Name"
                className="grow"
                onChange={onContactUpdate('name')}
              />
              <Input
                value={contact.email}
                placeholder="Email"
                className="grow"
                onChange={onContactUpdate('email')}
              />
            </div>
            <textarea
              value={contact.message}
              placeholder="Message"
              className="w-full h-[115px] opacity-50 rounded-[20px] px-[15px] py-[7px] outline-none border-[1px] border-[#E5DFDF] italic"
              onChange={(e: any) => onContactUpdate('message')(e.target.value)}
            />
            <div className="ml-auto">
              <Button
                content="Send Now"
                isLeft={false}
                onClick={onContactSubmit}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-[24px]">
            <h1 className="font-open-sans font-normal text-[#2B2B2B] text-3xl">
              Contact Us
            </h1>
            <div className="flex items-center gap-x-[15px]">
              <span className="w-12 h-12 flex rounded-full items-center justify-center bg-[#F69B03] shrink-0">
                <FaPhone fill="white" fontSize={24} />
              </span>
              <div className="w-full">
                <p className="font-bold">Call</p>
                <Text
                  renderBlock={({ children }) => <p>{children}</p>}
                  placeholder="Type phone number here..."
                  propName="phoneText"
                />
              </div>
            </div>
            <div className="flex items-center gap-x-[15px]">
              <Image alt="ClockIcon" src={ClockIcon} />
              <div className="w-full">
                <p className="font-bold">Work Time</p>
                <Text
                  renderBlock={({ children }) => <p>{children}</p>}
                  placeholder="Type work time here..."
                  propName="worktimeText"
                />
              </div>
            </div>
            <div className="flex items-center gap-x-[15px]">
              <span className="w-12 h-12 flex rounded-full items-center justify-center bg-[#F69B03] shrink-0">
                <FaLocationDot fill="white" fontSize={24} />
              </span>
              <div className="w-full">
                <p className="font-bold">Address</p>
                <Text
                  renderBlock={({ children }) => <p>{children}</p>}
                  placeholder="Type address here..."
                  propName="addressText"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Contact.schema = {
  name: 'contact',
  label: 'Contact',

  getDefaultProps: () => ({}),
  sideEditProps: [],
}

export { Contact }
