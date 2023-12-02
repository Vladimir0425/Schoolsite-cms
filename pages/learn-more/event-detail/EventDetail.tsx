import Image from 'next/image'

import EventIcon1 from '@/public/assets/eventdetail/event1.png'
import EventIcon11 from '@/public/assets/eventdetail/event1-1.png'
import EventIcon12 from '@/public/assets/eventdetail/event1-2.png'
import EventIcon13 from '@/public/assets/eventdetail/event1-3.png'
import EventIcon14 from '@/public/assets/eventdetail/event1-4.png'
import ClockIcon from '@/public/assets/eventdetail/clock.svg'
import TimeIcon from '@/public/assets/eventdetail/time.svg'
import AddressIcon from '@/public/assets/eventdetail/folder.svg'
import Address2Icon from '@/public/assets/eventdetail/person.svg'
import CalendarIcon from '@/public/assets/eventdetail/calendar.svg'
import TeacherIcon from '@/public/assets/eventdetail/teacher.svg'

import { Button } from '@/components/commons/Button'

export function EventDetail() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-x-[97px] mx-auto max-w-[1153px] mt-[137px]">
      <div className=" md:col-span-5 font-open-sans text-[#575757]">
        <Image alt="Detail Image 1" src={EventIcon1} className="w-full" />
        <div className="grid grid-cols-4 mt-[20px] gap-x-[20px]">
          <Image alt="Detail Image 2" src={EventIcon11} className="w-full" />
          <Image alt="Detail Image 3" src={EventIcon12} className="w-full" />
          <Image alt="Detail Image 4" src={EventIcon13} className="w-full" />
          <Image alt="Detail Image 5" src={EventIcon14} className="w-full" />
        </div>
        <p className="mt-[40px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel
          venenatis felis. Fusce id lectus sit amet nisi ornare ultricies. In
          sagittis lacinia lorem et tristique. Quisque mauris neque,
          sollicitudin sit amet imperdiet in, scelerisque sit amet arcu. In
          vehicula sem eget nisi convallis, a mattis orci imperdiet. Curabitur
          vitae sapien vel lectus sagittis consequat. Nullam enim velit,
          dignissim vel viverra ac, eleifend ut tellus.
        </p>
        <p className="mt-[20px]">
          Nunc at tincidunt nisl. Nullam fringilla quis odio vitae eleifend.
          Quisque sed mi erat. In hac habitasse platea dictumst. Vivamus mattis
          nunc quis turpis pretium sollicitudin. In eu semper justo. Phasellus
          facilisis hendrerit massa, sed auctor lacus convallis et. Vestibulum
          ac odio interdum, efficitur nisl ut, sollicitudin arcu. Donec commodo
          elementum tempus. In hac habitasse platea dictumst.
        </p>
        <h1 className="mt-[25px] mb-[13px] font-poppins font-medium text-xl text-[#2B2B2B]">
          Activities Involved
        </h1>
        <div className="grid gap-y-[5px] ml-[10px] mb-[41px]">
          <p>Program opening</p>
          <p>Dance and have fun</p>
          <p>Present gifts to students</p>
          <p>Program ending</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 font-poppins mb-[40px]">
          <div>
            <h1 className="w-[51px] h-[51px] rounded-[51px] flex justify-center items-center bg-gradient-to-b from-[#FDC830] to-[#F37335] font-bold text-[36px] text-white shrink-0">
              1
            </h1>
            <h1 className="mt-[8px] font-medium text-[#2B2B2B] text-[18px]">
              Program opening
            </h1>
            <p className="mt-[5px] text-sm">
              Nunc at tincidunt nisl. Nullam fringilla quis odio vitae eleifend.
              Quisque sed mi
            </p>
          </div>
          <div>
            <h1 className="w-[51px] h-[51px] rounded-[51px] flex justify-center items-center bg-gradient-to-b from-[#FDC830] to-[#F37335] font-bold text-[36px] text-white shrink-0">
              2
            </h1>
            <h1 className="mt-[8px] font-medium text-[#2B2B2B] text-[18px]">
              Program opening
            </h1>
            <p className="mt-[5px] text-sm ">
              Nunc at tincidunt nisl. Nullam fringilla quis odio vitae eleifend.
              Quisque sed mi
            </p>
          </div>
          <div>
            <h1 className="w-[51px] h-[51px] rounded-[51px] flex justify-center items-center bg-gradient-to-b from-[#FDC830] to-[#F37335] font-bold text-[36px] text-white shrink-0">
              3
            </h1>
            <h1 className="mt-[8px] font-medium text-[#2B2B2B] text-[18px]">
              Program opening
            </h1>
            <p className="mt-[5px] text-sm">
              Nunc at tincidunt nisl. Nullam fringilla quis odio vitae eleifend.
              Quisque sed mi
            </p>
          </div>
        </div>
      </div>
      <div className="md: col-span-2">
        <div className="grid grid-cols-1 gap-y-[25px] py-[50px] px-[32px] rounded-[23px] border-[1px] border-[#F37335] shadow-[0px_2px_10px_#15579914] mb-[45.6px]">
          <div className="flex gap-x-[15px]">
            <img src={Address2Icon} />
            <p className="font-poppins text-[#2B2B2B] text-[18px]">
              43 castle road 517 district
            </p>
          </div>
          <div className="flex gap-x-[15px]">
            <img src={CalendarIcon} />
            <div className="grid">
              <p className="font-poppins text-[#2B2B2B] text-[18px]">
                29/07/2020
              </p>
              <p className="font-poppins font-medium text-[#155799] text-[18px] italic">
                11AM to 15PM
              </p>
            </div>
          </div>
          <div className="flex gap-x-[15px]">
            <img src={TeacherIcon} />
            <div className="grid">
              <p className="font-poppins text-[#2B2B2B] text-[18px]">
                Hubert Franck
              </p>
              <p className="font-poppins  italic text-[#575757] text-sm">
                Science Teacher
              </p>
            </div>
          </div>
          <Button content="Sign Up Today" isLeft={true} />
        </div>
        <div className="mt-[50px] md:mt-[457px] grid grid-cols-1 gap-y-[25px] py-[50px] px-[32px] rounded-[23px] border-[1px] border-[#F37335] shadow-[0px_2px_10px_#15579914] mb-[45.6px]">
          <h1 className="font-poppins font-bold text-[#2B2B2B] text-xl">
            Our Contracts
          </h1>
          <div className="flex items-center gap-x-[15px]">
            <img src={ClockIcon} />
            <div>
              <p>Call</p>
              <p>+2 342 5446 67</p>
            </div>
          </div>
          <div className="flex items-center gap-x-[15px]">
            <img src={TimeIcon} />
            <div>
              <p>Work Time</p>
              <p>Mon - Fri 8 AM - 5 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-x-[15px]">
            <img src={AddressIcon} />
            <div>
              <p>Address</p>
              <p>Franklin St, Greenpoint Ave</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
