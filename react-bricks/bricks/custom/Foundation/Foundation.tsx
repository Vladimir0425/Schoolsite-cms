import { types } from 'react-bricks/frontend'
import { RichText } from 'react-bricks/frontend'

import { useEffect, useState } from 'react'
import { IoCheckmarkSharp } from 'react-icons/io5'

import { Button } from '@/components/commons/Button'

import clsx from 'clsx'

interface IFoundationProps {}

const Foundation: types.Brick<IFoundationProps> = () => {
  useEffect(() => {
    const styleLink = document.createElement('link')
    styleLink.rel = 'stylesheet'
    styleLink.href =
      'https://ribbon-public-bucket.s3.amazonaws.com/donation-embed/css/ribbon-donation-embed.css'
    document.head.appendChild(styleLink)

    const scriptLink = document.createElement('script')
    scriptLink.src =
      'https://ribbon-public-bucket.s3.amazonaws.com/donation-embed/js/ribbon-donation-embed.js'
    document.head.appendChild(scriptLink)

    const ribbonLink = document.createElement('link')
    ribbonLink.rel = 'stylesheet'
    ribbonLink.href = '/ribbon.css'
    document.head.appendChild(ribbonLink)
  }, [])

  return (
    <div className="max-w-screen-container px-4 container:px-0 mx-auto mb-[54px]">
      <div className="my-[80px]">
        <RichText
          renderBlock={({ children }) => (
            <p className="text-center font-open-sans text-[14px] text-[#707070]">
              {children}
            </p>
          )}
          renderBold={({ children }) => (
            <span className="font-poppins font-bold text-[#2B2B2B] text-[40px] text-center">
              {children}
            </span>
          )}
          allowedFeatures={[types.RichTextFeatures.Bold]}
          propName="foundText"
          placeholder="Type here..."
        />
      </div>
      <div className="ribbon-donation-embed-container flex justify-center">
        <ribbon-donation-embed
          id="ribbon-donation-embed"
          form_uuid="chem_OTzNO2spcx7GWdeg"
          dialog="false"
        />
      </div>
    </div>
  )
}

Foundation.schema = {
  name: 'foundation',
  label: 'Foundation',

  getDefaultProps: () => ({}),
}

export { Foundation }
