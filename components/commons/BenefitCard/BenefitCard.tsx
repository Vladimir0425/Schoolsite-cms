import { types } from 'react-bricks/frontend'
import { RichText } from 'react-bricks/frontend'
import clsx from 'clsx'

interface IBenefitCardProps {
  color: string
  title: string
  content: string
  name: string
}

const BenefitCard: types.Brick<IBenefitCardProps> = ({
  color,
  title,
  content,
  name,
}: IBenefitCardProps) => {
  return (
    <div className="max-w-[273px] shadow-[0px_2px_10px_#15579914] rounded-[10px] pt-[10px] pb-[20px] px-[15px]">
      <div
        className={clsx(
          `w-[37px] h-[37px] rounded-[37px] shrink-0 border-[1px] border-[#707070]`,
          color
        )}
      ></div>
      <RichText
        renderBlock={({ children }) => (
          <div className="text-[#575757] font-open-sans text-[14px]">
            {children}
          </div>
        )}
        renderBold={({ children }) => (
          <span className="text-[#2B2B2B] font-poppins font-medium text-[18px]">
            {children}
          </span>
        )}
        allowedFeatures={[types.RichTextFeatures.Bold]}
        propName={name}
      />
    </div>
  )
}

BenefitCard.schema = {
  name: 'benefitcard',
  label: 'BenefitCard',
  getDefaultProps: () => ({}),

  sideEditProps: [],
}

export { BenefitCard }
