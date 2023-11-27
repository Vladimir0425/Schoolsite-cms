import Image from 'next/image'

import SvgLogo from '@/public/assets/logo.svg'

export function Logo() {
  return (
    <div className="flex">
      <Image alt="System Logo" src={SvgLogo} />
      <div className="relative sm:hidden md:grid">
        <p className="absolute z-[-10] font-poppins font-bold text-[#F69B03] text-6xl">
          atlas
        </p>
        <p className="mt-[35px] w-[157px] text-center font-dancing-script font-medium text-[#2D4191] text-4xl">
          academics
        </p>
      </div>
    </div>
  )
}
