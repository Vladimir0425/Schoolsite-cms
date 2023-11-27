import { types } from 'react-bricks/frontend'
import { Text } from 'react-bricks/frontend'

import Image from 'next/image'

import Circle1 from '@/public/assets/about/circle1.svg'
import Circle2 from '@/public/assets/about/circle2.svg'

interface ISubHeaderProps {}

const SubHeader: types.Brick<ISubHeaderProps> = () => {
  return (
    <div className="hidden container:block subheader mb-20">
      <div className="bg-[#F2F7FD] pt-[78px] relative text-center">
        <Text
          renderBlock={({ children }) => (
            <h1 className="font-poppins text-[64px] text-[#F2A71B] w-full shrink-0">
              {children}
            </h1>
          )}
          propName="headText"
          placeholder="Type here..."
        />
        <Image
          alt="Left Circle"
          src={Circle1}
          className="absolute bottom-0 left-0 container:left-[20%]"
        />
        <Image
          alt="Right Circle"
          src={Circle2}
          className="absolute bottom-0 right-8"
        />
      </div>
      <div className="bg-[#F2A71B] flex items-center justify-center gap-x-3 border-y-2 border-[#707070] pt-[31px] pb-[16px] text-[36px] text-[white] font-poppins font-bold">
        <h1>Thrive in Knowledge</h1>
        <div className="bg-[#3365A6] w-[24px] h-[24px] rounded-full shrink-0 border-[1px #707070]"></div>
        <h1>Grow in Character</h1>
        <div className="bg-[#3365A6] w-[24px] h-[24px] rounded-full shrink-0 border-[1px #707070]"></div>
        <h1>Embrance Excellent</h1>
      </div>
    </div>
  )
}

SubHeader.schema = {
  name: 'subheader',
  label: 'Subheader',

  getDefaultProps: () => ({}),
  sideEditProps: [],
}

export { SubHeader }
