import clsx from 'clsx'

export interface ICirclenumBoxProps {
  value: string
  isSelected: boolean
  handleSelect: () => {}
}

export function Circlenumbox({ value, isSelected, handleSelect }) {
  return (
    <h1
      className={clsx(
        'w-[40px] h-[40px] rounded-[40px] border-[1px] border-solid border-[#E5DFDF] flex justify-center items-center font-poppins font-medium shrink-0 cursor-pointer',
        isSelected
          ? 'bg-gradient-to-b from-[#FDC830] to-[#F37335] text-[#070707]'
          : 'text-[#E5DFDF]'
      )}
      onClick={handleSelect}
    >
      {value}
    </h1>
  )
}
