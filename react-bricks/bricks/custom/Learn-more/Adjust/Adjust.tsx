import { types } from 'react-bricks/frontend'
import { Text, RichText } from 'react-bricks/frontend'

import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import { Button } from '@/components/commons/Button'
import { Input } from '@/components/forms/Input'

import { HttpService } from '@/services'
import { useSnackbar } from 'notistack'

const dislikeItems = [
  'Safety: My child does not feel physically, emotionally and/or psychologically safe.',
  'Engaged: My child is currently disconnected from their learning. It feels like they are going through the motions.',
  `Time: My child isn't given enough time for what is being asked of them or is given too much busy work.`,
  'Communication: I am not happy with the type or amount of communication my child and or family receives.',
  'None of the above apply to my child',
  'Other: ',
]

const likeItems = [
  'Flexible attendance policy: Ability to work from home if needed or take long week weekends for family vacations, flexible arrival and pick up',
  'Traditional structure: Firm attendance policy, lecture-style delivery, strict behavior requirements',
  'Academic flexibility: Mastery-based, ability to adjust based on learner, student-driven approach',
  'Warm and inviting: No negative reinforcement, encouraging, open communication',
]

const distinctItems = [
  'Mastery of content',
  'Good grades',
  'Meets state requirements',
  "Increase in my child's desire to learn",
  "Balance of my child's education with wife",
]

interface IAdjustProps {}

const Adjust: types.Brick<IAdjustProps> = () => {
  const router = useRouter()
  const pathname = router.pathname

  const { enqueueSnackbar } = useSnackbar()

  const [email, setEmail] = useState('')
  const [disChecks, setDisChecks] = useState<number[]>([])
  const [likeChecks, setLikeChecks] = useState<number[]>([])
  const [distinction, setDistinction] = useState('')
  const [dislikeOtherText, setDislikeOtherText] = useState('')
  const isAdmin = useMemo(() => {
    return pathname.startsWith('/admin')
  }, [pathname])

  const onInitStates = () => {
    setEmail('')
    setDisChecks([])
    setDislikeOtherText('')
    setLikeChecks([])
    setDistinction('')
  }

  const isValidate = () => {
    if (
      email === '' ||
      distinction === '' ||
      disChecks.length === 0 ||
      likeChecks.length === 0
    )
      return false
    return true
  }

  const onSubmitClick = () => {
    if (!isValidate()) {
      enqueueSnackbar('Input invalid!', { variant: 'warning' })
      return
    }

    const disCheckItems = disChecks.map((check: number) =>
      check === dislikeItems.length - 1 ? dislikeOtherText : dislikeItems[check]
    )
    const likeCheckItems = likeChecks.map((check: number) => likeItems[check])

    const body = {
      email,
      distinction,
      dislikeItems: JSON.stringify(disCheckItems),
      likeItems: JSON.stringify(likeCheckItems),
    }
    HttpService.post('/isright', body)
      .then((res) => {
        onInitStates()
        enqueueSnackbar('Quiz submit success!', { variant: 'success' })
      })
      .catch((err) => {
        enqueueSnackbar('Quiz fail!', { variant: 'error' })
      })
  }

  const onDislikeChange = (item: number) => () => {
    if (isAdmin) return
    if (disChecks.includes(item)) {
      setDisChecks(disChecks.filter((_item: number) => _item !== item))
    } else {
      setDisChecks([...disChecks, item])
    }
  }

  const onLikeItemChange = (item: number) => () => {
    if (isAdmin) return
    if (likeChecks.includes(item)) {
      setLikeChecks(likeChecks.filter((_item: number) => _item !== item))
    } else {
      setLikeChecks([...likeChecks, item])
    }
  }

  return (
    <div className="px-4 container:px-0 max-w-screen-container mx-auto mb-20">
      <Text
        renderBlock={({ children }) => (
          <h1 className="text-3xl font-bold md:text-5xl md:leading-snug mb-[50px]">
            {children}
          </h1>
        )}
        placeholder="Type heading here..."
        propName="headText"
      />

      <Input
        value={email}
        placeholder="Email"
        onChange={(_email: string | number | Date) => {
          setEmail(_email as string)
        }}
      />
      <div className="font-open-sans text-[#575757] text-sm italic">
        <Text
          renderBlock={({ children }) => (
            <p className="mt-[36px]">{children}</p>
          )}
          propName="dislikeText"
          placeholder="Type here..."
        />
        <div className="space-y-4 mt-[30px] mb-[19px]">
          {dislikeItems.map((item: string, index: number) => (
            <label
              key={item}
              className="flex items-center space-x-3"
              onClick={onDislikeChange(index)}
            >
              <div
                className={`h-[21px] w-[21px] rounded-[21px] border-[1px] border-solid border-[#E5DFDF]  shrink-0 ${
                  disChecks.includes(index) &&
                  'bg-gradient-to-b from-[#FDC830] to-[#F37335]'
                }`}
              ></div>
              <span className="text-gray-700 font-open-sans italic">
                {item}
              </span>
            </label>
          ))}
        </div>
        <textarea
          value={dislikeOtherText}
          onChange={(e: any) => setDislikeOtherText(e.target.value)}
          placeholder=""
          className="max-w-[801px] w-full h-[115px] opacity-50 rounded-[20px] px-[15px] py-[7px] outline-none border-[1px] border-[#E5DFDF]"
        />
        <div className="w-full mt-[49px] mb-[14px]">
          <RichText
            renderBlock={({ children }) => <p>{children}</p>}
            propName="distinction"
          />
        </div>
        <select
          value={distinction}
          onChange={(e: any) => setDistinction(e.target.value)}
          className="outline-none px-4 py-3 border border-gray-200 rounded-2xl text-sm mb-[92px] max-w-[250px] w-full"
        >
          <option value="">Choose</option>
          {distinctItems.map((item: string) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="mb-[63px]">
          <Text
            renderBlock={({ children }) => (
              <h1 className="font-poppins font-bold text-[#2B2B2B] text-5xl not-italic">
                {children}
              </h1>
            )}
            propName="likeHeadText"
          />
          <div className="space-y-4 mt-[30px]">
            {likeItems.map((item: string, index: number) => (
              <label
                key={`like-item-label-${index}`}
                className="flex items-center space-x-3"
              >
                <div
                  className={`h-[21px] w-[21px] rounded-[21px] border-[1px] border-solid border-[#E5DFDF]  shrink-0 ${
                    likeChecks.includes(index) &&
                    'bg-gradient-to-b from-[#FDC830] to-[#F37335]'
                  }`}
                  onClick={onLikeItemChange(index)}
                ></div>
                <span className="text-gray-700 font-open-sans italic">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
        <RichText
          renderBlock={({ children }) => (
            <p className="font-poppins font-medium text-[#2B2B2B] text-xl not-italic mb-[50px]">
              {children}
            </p>
          )}
          propName="summaryText"
        />
      </div>
      <div className="w-full flex justify-end">
        <div className="w-[180px]">
          <Button content="Send Now" isLeft={false} onClick={onSubmitClick} />
        </div>
      </div>
    </div>
  )
}

Adjust.schema = {
  name: 'adjust',
  label: 'Adjust',

  getDefaultProps: () => ({}),
  sideEditProps: [],
}

export { Adjust }
