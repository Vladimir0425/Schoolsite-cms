import clsx from 'clsx'
import { ChangeEvent } from 'react'

type InputType = 'text' | 'number' | 'date'
type ValueType = string | number | Date

interface IInputProps {
  type?: InputType
  placeholder?: string
  value?: ValueType
  onChange?: (data: string | number | Date) => void
  className?: string
  min?: number
  max?: number
}

export function Input({
  type = 'text',
  value = '',
  placeholder = '',
  className = '',
  onChange = () => {},
  min = 0,
  max = 100,
  ...nativeAttrs
}: IInputProps) {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value: ValueType = e.target.value
    if (type === 'number') value = Number(e.target.value)
    else if (type === 'date') value = new Date(e.target.value)
    onChange(value)
  }

  return (
    <input
      type={type}
      value={value.toString()}
      min={min}
      max={max}
      placeholder={placeholder}
      onChange={onInputChange}
      className={clsx(
        'px-[15px] py-[7px] rounded-[39px] outline-none italic border-[1px] border-[#E5DFDF] min-w-0',
        className
      )}
      {...nativeAttrs}
    />
  )
}
