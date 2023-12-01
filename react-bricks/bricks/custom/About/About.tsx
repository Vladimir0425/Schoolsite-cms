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
    // if (Object.values(contact).every((item) => item === '')) return
    // const body = { ...contact, type: 'brochure' }
    // HttpService.post('/message', body).then((res) => {
    //   setContact(initialContact)
    // })
  }

  return (
    <div className="w-full">
      <div className="px-4 container:px-0 max-w-screen-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:mt-[144px]">
          <div className="mt-[29px]">
            <div className="text-[60px] leading-tight text-[#2B2B2B] font-poppins font-bold mb-[31px]">
              <RichText
                renderBlock={({ children }) => <h1>{children}</h1>}
                renderHighlight={({ children }) => (
                  <span className="text-[#3365A6]">{children}</span>
                )}
                allowedFeatures={[types.RichTextFeatures.Highlight]}
                propName="mainHead"
                placeholder="Type here..."
              />
            </div>
            <RichText
              renderBlock={({ children }) => (
                <p className="text-[#575757] font-open-sans max-w-[566px] mb-[20px]">
                  {children}
                </p>
              )}
              renderH1={({ children }) => (
                <h1 className="text-[40px] text-[#3365A6] font-poppins font-bold mb-[16px]">
                  {children}
                </h1>
              )}
              allowedFeatures={[types.RichTextFeatures.Heading1]}
              propName="mainText"
              placeholder="Type here..."
            />
          </div>
          <div className="relative md:animate-fadeInUp1 max-w-[450px]">
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
              imageClassName="mt-[82px] ml-[30px] z-[10] rounded-full aspect-square"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <BImage
            alt="Background"
            imageClassName="hidden md:block md:animate-fadeInUp3 rounded-full"
            propName="BackImage"
          />
          <div className="ml-[20px]">
            <RichText
              renderBlock={({ children }) => (
                <p className="font-open-sans max-w-[566px] text-[#575757] text-[14px] mb-[20px]">
                  {children}
                </p>
              )}
              renderH1={({ children }) => (
                <h1 className="font-poppins font-bold text-[40px] text-[#3365A6] mb-[16px]">
                  {children}
                </h1>
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
                types.RichTextFeatures.Heading1,
                types.RichTextFeatures.Highlight,
                types.RichTextFeatures.UnorderedList,
              ]}
              propName="missionText"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-48">
          <div className="max-w-[563px]">
            <RichText
              renderBlock={({ children }) => (
                <p className="text-[#575757] text-[14px]">{children}</p>
              )}
              renderH1={({ children }) => (
                <h1 className="font-poppins font-bold text-[40px] mb-[16px] text-[#3365A6]">
                  {children}
                </h1>
              )}
              renderUL={({ children }) => (
                <ul className="flex flex-col gap-y-1">{children}</ul>
              )}
              renderLI={({ children }) => (
                <li className="text-[#575757] text-[14px] flex gap-x-1 items-start">
                  <span className="mt-[8px] w-[4px] h-[4px] bg-[#575757] rounded-full shrink-0"></span>
                  {children}
                </li>
              )}
              allowedFeatures={[
                types.RichTextFeatures.Heading1,
                types.RichTextFeatures.UnorderedList,
              ]}
              propName="benefitText"
            />
            {/*<div>
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
              </div>*/}
          </div>
          {/* <div className="grid grid-cols-1 gap-8 w-full"> */}
          <BImage
            alt="Background"
            imageClassName="rb-lazy hidden aspect-square md:block md:animate-fadeInUp3 rounded-full w-full max-w-[500px]"
            propName="BackImage2"
          />
          {/* <div className="flex flex-col gap-y-[30px] w-full">
              {benefitCardItems1.map((item) => (
                <BenefitCard
                  key={item.propName}
                  color={item.color}
                  title={item.title}
                  content={item.content}
                  name={item.propName}
                />
              ))}
            </div> */}
          {/* <div className="md:mt-[64px] flex flex-col gap-y-[30px] w-full">
              {benefitCardItems2.map((item) => (
                <BenefitCard
                  key={item.propName}
                  color={item.color}
                  title={item.title}
                  content={item.content}
                  name={item.propName}
                />
              ))}
            </div> */}
          {/* </div> */}
        </div>
        <div className="flex justify-center mt-[58px]">
          <div className="max-w-[1166px] flex flex-col mb-[92px]">
            <RichText
              renderBlock={({ children }) => (
                <p className="font-open-sans text-[#575757] text-[14px] mb-[20px]">
                  {children}
                </p>
              )}
              renderH1={({ children }) => (
                <h1 className="font-poppins font-bold text-[#3365A6] text-[40px] mb-[16px]">
                  {children}
                </h1>
              )}
              renderUL={({ children }) => (
                <ul className="flex flex-col gap-y-1">{children}</ul>
              )}
              renderLI={({ children }) => (
                <li className="text-[#575757] text-[14px] flex gap-x-1 items-start">
                  <span className="mt-[8px] w-[4px] h-[4px] bg-[#575757] rounded-full shrink-0"></span>
                  {children}
                </li>
              )}
              allowedFeatures={[
                types.RichTextFeatures.Heading1,
                types.RichTextFeatures.UnorderedList,
              ]}
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
