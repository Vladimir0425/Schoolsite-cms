import clsx from 'clsx'

import { FaPaperPlane } from 'react-icons/fa6'

export interface IButtonProps {
  content: string
  isLeft: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
}

export function Button({
  content,
  isLeft,
  disabled = false,
  className = '',
  onClick = () => {},
}: IButtonProps) {
  return (
    <div
      className={clsx(
        !isLeft ? 'ml-auto' : 'mr-auto',
        'h-[39px] max-w-[180px] rounded-[39px] flex items-center justify-between px-[6px] cursor-pointer mt-[21px]',
        disabled
          ? 'cursor-not-allowed bg-gray-200'
          : 'cursor-pointer bg-gradient-to-r from-[#0E6BA8] to-[#155799] hover:from-[#F37335] hover:to-[#F37335] ',
        className
      )}
      onClick={!disabled ? onClick : () => {}}
    >
      <div className="bg-white h-[27px] w-[27px] rounded-[27px] flex items-center justify-center shrink-0">
        <FaPaperPlane fill="#0E6BA8" />
      </div>
      <div className="flex items-center justify-center grow">
        <p className="text-white font-poppins font-medium">{content}</p>
      </div>
    </div>
  )
}
