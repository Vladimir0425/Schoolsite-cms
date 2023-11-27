import { types } from 'react-bricks/frontend'
import { RichText, Text, Image as BImage } from 'react-bricks/frontend'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/router'

import { Button } from '@/components/commons/Button'
import { Input } from '@/components/forms/Input'
import { BenefitCard } from '@/components/commons/BenefitCard'

import { HttpService } from '@/services'
import Image from 'next/image'

interface beneCardItem {
  color: string
  title: string
  content: string
  propName: string
}

const benefitCardItems1: beneCardItem[] = [
  {
    color: 'bg-[#F7B500]',
    title: 'Mastery Based Learning',
    content: 'Vivamus intequis rdum, mauris quis cursus sodaquis les',
    propName: 'Benecard1',
  },
  {
    color: 'bg-[#7891BF]',
    title: 'Guided Instruction',
    content:
      'Mauris nec mi feugiafr ingillat, cursus fringilla nec, pharetra tellus',
    propName: 'Benecard2',
  },
  {
    color: 'bg-[#F7B500]',
    title: 'Project Based Learning',
    content: 'Vivamus intequis rdum, mauris quis cursus sodaquis les',
    propName: 'Benecard3',
  },
]

const benefitCardItems2: beneCardItem[] = [
  {
    color: 'bg-[#3365A6]',
    title: 'Technology Driven',
    content:
      'Pellentesque fringilla eget augufringilla e id phafringilla retra',
    propName: 'Benecard4',
  },
  {
    color: 'bg-[#C1C1C1]',
    title: 'Independent Learning',
    content:
      'Etiam risus neque, volfringillautpat vel laoreet a, finibus non ligula',
    propName: 'Benecard5',
  },
  {
    color: 'bg-[#3365A6]',
    title: 'No Required Homework',
    content:
      'Pellentesque fringilla eget augufringilla e id phafringilla retra',
    propName: 'Benecard6',
  },
]

const initialContact = {
  name: '',
  email: '',
  message: '',
}

interface AboutProps {}

const About: types.Brick<AboutProps> = () => {
  const router = useRouter()
  const pathname = router.pathname
  const [contact, setContact] = useState(initialContact)
  const isAdmin = useMemo(() => {
    return pathname.startsWith('/admin')
  }, [pathname])

  const navigate = (path: string) => {
    router.push(path)
  }

  const onContactChange = (field: string) => (value: any) => {
    setContact({
      ...contact,
      [field]: value,
    })
  }

  const onContactSubmit = () => {
    if (Object.values(contact).every((item) => item === '')) return
    const body = { ...contact, type: 'brochure' }
    // HttpService.post('/message', body).then((res) => {
    //   setContact(initialContact)
    // })
  }

  return (
    <div className="w-full">
      <div className="px-4 container:px-0 max-w-screen-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-[144px] ">
          <div className="mt-[29px]">
            <div className="text-[48px] text-[#2B2B2B] font-poppins font-bold mb-[31px] ml-[12.5px]">
              <RichText
                renderBlock={({ children }) => <h1>{children}</h1>}
                renderHighlight={({ children }) => (
                  <span className="text-[#F37335]">{children}</span>
                )}
                allowedFeatures={[types.RichTextFeatures.Highlight]}
                propName="mainHead"
                placeholder="Type here..."
              />
            </div>
            <RichText
              renderBlock={({ children }) => (
                <p className="text-[#575757] font-open-sans max-w-[566px] mb-[31px]">
                  {children}
                </p>
              )}
              allowedFeatures={[types.RichTextFeatures.Highlight]}
              propName="mainText"
              placeholder="Type here..."
            />
            <div className="ml-[36px]">
              <Button
                content="Apply"
                isLeft={true}
                onClick={() => navigate('/admissions')}
              />
            </div>
          </div>
          <div className="relative md:animate-fadeInUp1">
            <BImage
              alt="Character1"
              propName="ChImage1"
              imageClassName="absolute left-[161px] rounded-full"
            />
            <BImage
              alt="Character2"
              propName="ChImage2"
              imageClassName="absolute top-[199px] rounded-full"
            />
            <BImage
              alt="Character3"
              propName="ChImage3"
              imageClassName="mt-[82px] ml-[30px] z-[10] rounded-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-[167px]">
          <BImage
            alt="Background"
            imageClassName="md:animate-fadeInUp3 rounded-full"
            propName="BackImage"
          />
          <div className="mt-[154px] ml-[20px]">
            <RichText
              renderBlock={({ children }) => (
                <p className="font-open-sans max-w-[566px] text-[#575757] text-[14px] mb-[21px]">
                  {children}
                </p>
              )}
              renderBold={({ children }) => (
                <span className="font-poppins font-bold text-[48px] text-[#2B2B2B] mb-[21px]">
                  {children}
                </span>
              )}
              renderHighlight={({ children }) => (
                <span className="font-poppins font-medium text-[#F37335] uppercase">
                  {children}
                </span>
              )}
              renderUL={({ children }) => (
                <ul className="ml-[29px] font-open-sans text-[#575757] text-[14px]">
                  {children}
                </ul>
              )}
              renderLI={({ children }) => (
                <li className="mb-[5px]">{children}</li>
              )}
              allowedFeatures={[
                types.RichTextFeatures.Bold,
                types.RichTextFeatures.Highlight,
                types.RichTextFeatures.UnorderedList,
              ]}
              propName="missionText"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-[21px]">
          <div className="mt-[91px] max-w-[563px]">
            <div>
              <RichText
                renderBlock={({ children }) => (
                  <p className="text-[#575757] text-[14px]">{children}</p>
                )}
                renderBold={({ children }) => (
                  <span className="font-poppins font-bold text-[48px] text-[#2B2B2B]">
                    {children}
                  </span>
                )}
                allowedFeatures={[types.RichTextFeatures.Bold]}
                propName="benefitText"
              />
            </div>
            <div>
              <h1 className="font-[poppins] font-bold text-[#2B2B2B] text-[36px] mt-[56px]">
                Request a Brochure
              </h1>
              <div className="mt-[17px] mb-[20px] w-full flex">
                <Input
                  value={contact.name}
                  placeholder="Name"
                  className="grow"
                  onChange={onContactChange('name')}
                />
                <Input
                  value={contact.email}
                  placeholder="Email"
                  className="grow"
                  onChange={onContactChange('email')}
                />
              </div>
              <textarea
                value={contact.message}
                placeholder="Message"
                className="w-full h-[115px] opacity-50 rounded-[20px] px-[15px] py-[7px] outline-none border-[1px] border-[#E5DFDF] italic"
                onChange={(e: any) =>
                  onContactChange('message')(e.target.value)
                }
              />
              <Button
                content="Send Now"
                isLeft={false}
                onClick={onContactSubmit}
              />
            </div>
          </div>
          <div className="ml-[20px] flex w-full">
            <div className="flex flex-col gap-y-[30px] grow shrink-0">
              {benefitCardItems1.map((item) => (
                <BenefitCard
                  key={item.propName}
                  color={item.color}
                  title={item.title}
                  content={item.content}
                  name={item.propName}
                />
              ))}
            </div>
            <div className="mt-[64px] flex flex-col gap-y-[30px] grow shrink-0">
              {benefitCardItems2.map((item) => (
                <BenefitCard
                  key={item.propName}
                  color={item.color}
                  title={item.title}
                  content={item.content}
                  name={item.propName}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-[58px]">
          <div className="max-w-[1166px] flex flex-col mb-[92px]">
            <RichText
              renderBlock={({ children }) => (
                <div className="font-open-sans text-[#575757] text-[14px] mb-2">
                  {children}
                </div>
              )}
              renderBold={({ children }) => (
                <h1 className="font-poppins font-bold text-[#2B2B2B] text-[48px]">
                  {children}
                </h1>
              )}
              allowedFeatures={[types.RichTextFeatures.Bold]}
              propName="cultureText"
              placeholder="Type here..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

About.schema = {
  name: 'About',
  label: 'About',
  mapExternalDataToProps: (data, brickProps) => ({}),
  getDefaultProps: () => ({}),

  sideEditProps: [],
}

export { About }
