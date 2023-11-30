import { types } from 'react-bricks/frontend'
import { Text, RichText, Image as BImage } from 'react-bricks/frontend'

import { useRouter } from 'next/router'
import { useState } from 'react'

import { Button } from '@/components/commons/Button'

interface IScheduleProps {}

const Schedule: types.Brick<IScheduleProps> = () => {
  // const router = useRouter()
  // const navigate = (path: string) => {
  //   router.push(path)
  // }
  const [scheduleAnchor, setScheduleAnchor] = useState(false)

  return (
    <div className="px-4 container:px-0 max-w-screen-container mx-auto">
      <Text
        renderBlock={({ children }) => (
          <h1 className="text-6xl text-center font-bold mb-10">{children}</h1>
        )}
        placeholder="Type heading text..."
        propName="headText"
      />
      <BImage
        alt="Back Image"
        imageClassName="mx-auto mb-[47px]"
        propName="backImage"
      />
      <div className="w-full mb-[129px]">
        <RichText
          renderBlock={({ children }) => (
            <p className="font-poppins font-medium text-[14px] text-[#575757] mb-4">
              {children}
            </p>
          )}
          propName="bodyText"
        />
        {scheduleAnchor && (
          <div className="w-full h-[450px]">
            <iframe
              src="https://calendly.com/atlas-admission?embed_domain=www.atlasacademics.com&amp;embed_type=Inline&amp;hide_landing_page_details=1&amp;hide_gdpr_banner=1&amp;primary_color=bec431"
              width="100%"
              height="100%"
              title="Select a Date &amp; Time - Calendly"
            />
          </div>
        )}
        <div className="flex gap-x-4 justify-end">
          {scheduleAnchor && (
            <Button
              content="Cancel"
              isLeft={false}
              onClick={() => setScheduleAnchor(false)}
              className="ml-0 mr-0 shrink-0 min-w-[140px]"
            />
          )}
          <Button
            content="Schedule"
            isLeft={false}
            onClick={() => setScheduleAnchor(true)}
            className="ml-0 mr-0 shrink-0 min-w-[140px]"
          />
        </div>
      </div>
    </div>
  )
}

Schedule.schema = {
  name: 'schedule',
  label: 'Schedule',

  getDefaultProps: () => ({}),
  sideEditProps: [],
}

export { Schedule }
