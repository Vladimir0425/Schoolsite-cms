import { types } from 'react-bricks/frontend'
import { Text, RichText, Image as BImage } from 'react-bricks/frontend'

import { useRouter } from 'next/router'

import { Button } from '@/components/commons/Button'

interface IScheduleProps {}

const Schedule: types.Brick<IScheduleProps> = () => {
  const router = useRouter()
  const navigate = (path: string) => {
    router.push(path)
  }

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
      <div className="max-w-[1150px] mx-auto mb-[129px]">
        <RichText
          renderBlock={({ children }) => (
            <p className="font-poppins font-medium text-[14px] text-[#575757] mb-4">
              {children}
            </p>
          )}
          propName="bodyText"
        />
        <Button
          content="Schedule"
          isLeft={false}
          onClick={() => navigate('/contacts')}
        />
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
