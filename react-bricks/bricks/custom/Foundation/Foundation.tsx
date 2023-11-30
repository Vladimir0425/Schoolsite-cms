import { types } from 'react-bricks/frontend'
import { RichText } from 'react-bricks/frontend'

import { useState } from 'react'
import { IoCheckmarkSharp } from 'react-icons/io5'

import { Button } from '@/components/commons/Button'

import clsx from 'clsx'
import styles from './Foundation.module.scss'

interface IFoundationProps {}

type donModeType = '' | 'Give Once' | 'Give Monthly'
type donAmountType = 50 | 100 | 250 | 0

const Foundation: types.Brick<IFoundationProps> = () => {
  const [donMode, setDonMode] = useState<donModeType>('Give Once')
  const [donAmount, setDonAmount] = useState<donAmountType>(50)
  const [creditCheck, setCreditCheck] = useState(false)
  const [honorCheck, setHonorCheck] = useState(false)

  const onFeeModeChange = (mode: donModeType) => {
    setDonMode(donMode === mode ? '' : mode)
  }

  const onDonAmountChange = (amount: donAmountType) => {
    setDonAmount(donAmount === amount ? 0 : amount)
  }

  const onPayClick = () => {
    const link = document.createElement('a')
    link.href =
      'https://connect.intuit.com/portal/app/CommerceNetwork/view/scs-v1-d770873762304e4dbb026f5b41a6d377db5e0c18ba6e41f1af177629b90341504136ab4255aa4c978a761d9ed0887955?locale=EN_US'
    link.target = '_blank'
    link.click()
  }

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
      <div className="flex justify-center gap-4 mb-[48.2px]">
        {['Give Once', 'Give Monthly'].map((mode: donModeType) => (
          <h1
            key={mode}
            className={clsx(
              styles.modePanel,
              donMode === mode ? styles.activeMode : styles.normalMode
            )}
            onClick={() => onFeeModeChange(mode)}
          >
            {mode}
          </h1>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-[42px]">
        {[50, 100, 250].map((amount: donAmountType) => (
          <h1
            key={amount}
            className={clsx(
              styles.amountPanel,
              donAmount === amount ? styles.activeAmount : styles.normalAmount
            )}
            onClick={() => onDonAmountChange(amount)}
          >
            ${amount}
          </h1>
        ))}
      </div>
      <div className="w-full grid justify-center mb-[50px]">
        <h1 className="font-poppins font-bold text-sm sm:text-4xl text-[#3365A6]">
          OTHER AMOUNT
        </h1>
        <div className="h-[3px] w-full bg-[#707070] mb-[68.5px]"></div>
        <div className="font-poppins font-bold flex items-center gap-x-6">
          <div
            className="w-6 sm:w-12 aspect-square border-[3px] border-solid border-[#707070] flex items-center justify-center cursor-pointer shrink-0"
            onClick={() => setCreditCheck(!creditCheck)}
          >
            {creditCheck ? (
              <IoCheckmarkSharp
                fill="#707070"
                fontSize={48}
                className="h-4 sm:h-10"
              />
            ) : (
              <></>
            )}
          </div>
          <h1 className="text-md sm:text-4xl">
            Add $4.00 to my donation to cover credit card fees
          </h1>
        </div>
        <div className="font-poppins font-bold flex items-center gap-x-6 mt-8 sm:mt-[54px]">
          <div
            className="w-6 sm:w-12 aspect-square border-[3px] border-solid border-[#707070] flex items-center justify-center cursor-pointer shrink-0"
            onClick={() => setHonorCheck(!honorCheck)}
          >
            {honorCheck ? (
              <IoCheckmarkSharp
                fill="#707070"
                fontSize={48}
                className="h-4 sm:h-10"
              />
            ) : (
              <></>
            )}
          </div>
          <h1 className="text-md sm:text-4xl">
            Make this donation in someone's honor or memory
          </h1>
        </div>
      </div>
      <Button
        content="Pay Now"
        isLeft={true}
        className="mx-auto"
        onClick={onPayClick}
      />
    </div>
  )
}

Foundation.schema = {
  name: 'foundation',
  label: 'Foundation',

  getDefaultProps: () => ({}),
}

export { Foundation }
