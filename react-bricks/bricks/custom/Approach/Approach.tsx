import { types } from 'react-bricks/frontend'
import { Text, RichText, Image as BImage } from 'react-bricks/frontend'

import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/commons/Button'
import { Input } from '@/components/forms/Input'

import { FaPhone, FaLocationDot } from 'react-icons/fa6'

import { HttpService } from '@/services'

import ClockIcon from '@/public/assets/approach/clock.svg'
import TaskImage from '@/public/assets/approach/task.png'

interface IContact {
  name: string
  email: string
  phone: string
  message: string
}

const initialContact: IContact = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

interface IApproachProps {}

const Approach: types.Brick<IApproachProps> = () => {
  const [contact, setContact] = useState<IContact>(initialContact)

  const onContactUpdate =
    (field: string) => (value: string | number | Date) => {
      setContact({
        ...contact,
        [field]: value,
      })
    }

  const onContactSubmit = () => {
    if (Object.values(contact).every((item) => item === '')) return
    const body = { ...contact, type: 'spotting' }
    // HttpService.post('/message', body).then((res) => {
    //   setContact(initialContact)
    // })
  }

  return (
    <div className="mb-[121px]">
      <BImage
        alt="BackgroundImage"
        imageClassName="w-full mb-[50px]"
        propName="backImage"
      />
      <div className="grid grid-cols-5 md:grid-cols-7 gap-x-[51px] px-4 container:px-0 max-w-screen-container mx-auto">
        <div className="col-span-5 font-open-sans text-[14px] text-[#575757]">
          <RichText
            renderBlock={({ children }) => <p className="mb-5">{children}</p>}
            renderBold={({ children }) => (
              <span className="font-poppins font-medium text-6xl leading-[1.1] text-[#2B2B2B]">
                {children}
              </span>
            )}
            allowedFeatures={[types.RichTextFeatures.Bold]}
            propName="rightText"
            placeholder="Type here..."
          />
          <div className="mt-[20px]">
            <BImage
              alt="SubBackImage"
              imageClassName="mb-[20px] w-full"
              propName="subBackImage"
            />
            <div className="grid grid-cols-4 gap-x-5 mb-[25px]">
              <BImage
                alt="SubImage1"
                imageClassName="w-full"
                propName="subImage1"
              />
              <BImage
                alt="SubImage2"
                imageClassName="w-full"
                propName="subImage2"
              />
              <BImage
                alt="SubImage3"
                imageClassName="w-full"
                propName="subImage3"
              />
              <BImage
                alt="SubImage4"
                imageClassName="w-full"
                propName="subImage4"
              />
            </div>
          </div>
          <RichText
            renderBlock={({ children }) => <p className="mb-5">{children}</p>}
            renderBold={({ children }) => (
              <span className="font-poppins font-medium text-[20px] text-[#2B2B2B]">
                {children}
              </span>
            )}
            renderUL={({ children }) => <ul className="flex">{children}</ul>}
            renderLI={({ children }) => (
              <li className="basis-[350px] shrink-0">{children}</li>
            )}
            allowedFeatures={[
              types.RichTextFeatures.Bold,
              types.RichTextFeatures.UnorderedList,
            ]}
            propName="subText"
          />
          {/* <Button content="Enroll Now" isLeft={true} /> */}
          <Image alt="Task Image" src={TaskImage} />
        </div>
        <div className="col-span-5 mt-[50px] md:col-span-2">
          <div className="py-[50px] px-[11px] rounded-[23px] border-[1px] border-[#F37335] shadow-[0px_2px_10px_#15579914]">
            <h1 className="font-poppins font-bold text-[#2B2B2B] text-xl mb-[29px]">
              Secure You Childs Spot
            </h1>
            <div className="grid grid-cols-1 gap-y-[29px]">
              <Input
                value={contact.name}
                placeholder="Name"
                onChange={onContactUpdate('name')}
              />
              <Input
                value={contact.email}
                placeholder="Email"
                onChange={onContactUpdate('email')}
              />
              <Input
                value={contact.phone}
                placeholder="Phone"
                onChange={onContactUpdate('phone')}
              />
            </div>
            <div className="w-full bg-[#E5DFDF] h-[1px] mt-[10px] mb-[3px]"></div>
            <textarea
              value={contact.message}
              placeholder="Message"
              className="w-full h-[115px] opacity-50 rounded-[20px] px-[15px] py-[7px] outline-none border-[1px] border-[#E5DFDF] italic"
              onChange={(e: any) => onContactUpdate('message')(e.target.value)}
            />
            <Button
              content="Enquire Today"
              isLeft={true}
              onClick={onContactSubmit}
            />
          </div>
          <div className="mt-[50px] grid grid-cols-1 gap-y-[25px] py-[50px] px-[32px] rounded-[23px] border-[1px] border-[#F37335] shadow-[0px_2px_10px_#15579914] mb-[45.6px]">
            <h1 className="font-poppins font-bold text-[#2B2B2B] text-xl">
              Our Contracts
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

          {/* <h1 className="font-poppins font-bold text-[#2B2B2B] text-xl rounded-[23px] border-[1px] border-[#F37335] shadow-[0px_2px_10px_#15579914] text-center py-[8px]">
            Calendar
          </h1> */}
          <div className="grid grid-cols-1 gap-y-[25px] py-[50px] px-[32px]"></div>
        </div>
      </div>
    </div>
  )
}

Approach.schema = {
  name: 'approach',
  label: 'Approach',
  getDefaultProps: () => ({}),

  sideEditProps: [],
}

export { Approach }
