import { types } from 'react-bricks/frontend'
import { Text, RichText } from 'react-bricks/frontend'

import { useState } from 'react'
import { useSnackbar } from 'notistack'

import { Circlenumbox } from '@/components/commons/CircleNumbox'
import { Input } from '@/components/forms/Input'
import { Button } from '@/components/commons/Button'

import { HttpService } from '@/services'

const gradeItems: number[] = [4, 5, 6, 7, 8]

interface IAdmission {
  student_first_name: string
  student_last_name: string
  birth_date: Date
  grade_level: number[]
  parent_first_name: string
  parent_last_name: string
  email: string
  phone_number: string
  zipcode: string
  about: string
  fee_type: string
}

const initialAdmission = {
  student_first_name: '',
  student_last_name: '',
  birth_date: new Date(),
  grade_level: [],
  parent_first_name: '',
  parent_last_name: '',
  email: '',
  phone_number: '',
  zipcode: '',
  about: '',
  fee_type: 'ready',
}

interface IAdmissionsProps {}

const Admissions: types.Brick<IAdmissionsProps> = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [admission, setAdmission] = useState<IAdmission>(initialAdmission)
  const [birthYear, setBirthYear] = useState(new Date().getFullYear())
  const [birthMonth, setBirthMonth] = useState(new Date().getMonth() + 1)
  const [birthDay, setBirthDay] = useState(new Date().getDate())

  const onDataChange = (field: string) => (data: string | number | Date) => {
    let value: string | number | Date = data
    if (
      ['birth_date_year', 'birth_date_month', 'birth_date_day'].includes(field)
    ) {
      const date = admission.birth_date
      if (field.endsWith('year')) setBirthYear(data as number)
      else if (field.endsWith('month')) setBirthMonth(data as number)
      else setBirthDay(data as number)
      value = date
    }

    setAdmission({
      ...admission,
      [field]: value,
    })
  }

  const onGradeChange = (value: number) => () => {
    if (admission.grade_level.includes(value)) {
      setAdmission({
        ...admission,
        grade_level: admission.grade_level.filter((item) => item !== value),
      })
    } else {
      setAdmission({
        ...admission,
        grade_level: [...admission.grade_level, value],
      })
    }
  }

  const isValid = () => {
    return !Object.keys(admission)
      .filter((key: string) => key !== 'birth_date')
      .some(
        (key: string) =>
          (typeof admission[key] === 'string' && admission[key] === '') ||
          (key === 'grade_level' && Object.values(admission[key]).length === 0)
      )
  }

  const onSubmitClick = () => {
    // if (!isValid()) {
    //   enqueueSnackbar('Input invalid!', { variant: 'warning' })
    //   return
    // }
    const body = {
      ...admission,
      birth_date: new Date(birthYear, birthMonth - 1, birthDay),
      fee_type:
        admission.fee_type === 'ready'
          ? 'Yes, I am ready to pay $125 to commit my student!'
          : admission.fee_type === 'not-quite'
          ? 'No, I am not quite ready to commit my student.'
          : "Add my child to next year's wait list",
    }
    HttpService.post('/admission', body)
      .then((res) => {
        setAdmission(initialAdmission)
        enqueueSnackbar('Submit success!', { variant: 'success' })
      })
      .catch((err) => {
        enqueueSnackbar('Admission fail!', { variant: 'error' })
      })
  }

  const onPayClick = () => {
    const link = document.createElement('a')
    link.href =
      'https://connect.intuit.com/portal/app/CommerceNetwork/view/scs-v1-d770873762304e4dbb026f5b41a6d377db5e0c18ba6e41f1af177629b90341504136ab4255aa4c978a761d9ed0887955?locale=EN_US'
    link.target = '_blank'
    link.click()
  }

  return (
    <div className="px-4 container:px-0 max-w-screen-container mx-auto font-open-sans text-[#575757] text-[14px]">
      <RichText
        renderBlock={({ children }) => <p className="mb-4">{children}</p>}
        renderH1={({ children }) => (
          <h1 className="font-bold text-[36px] text-[#3365A6] mb-[20px]">
            {children}
          </h1>
        )}
        allowedFeatures={[types.RichTextFeatures.Heading1]}
        propName="headText"
      />
      <div className="max-w-[860px] mt-[40px] grid grid-cols-1 gap-y-[21px]">
        <div className="grid grid-cols-2 gap-x-[29px]">
          <Input
            value={admission.student_first_name}
            onChange={onDataChange('student_first_name')}
            placeholder="Students First Name"
          />
          <Input
            value={admission.student_last_name}
            onChange={onDataChange('student_last_name')}
            placeholder="Students Last Name"
          />
        </div>
        <div className="flex items-center gap-x-[23px] flex-wrap gap-4">
          <div className="min-w-[100px] shrink-0">
            <Text
              renderBlock={({ children }) => (
                <p className="font-open-sans text-[#2B2B2B] italic">
                  {children}
                </p>
              )}
              propName="birthLabelText"
            />
          </div>
          <div className="flex gap-x-[23px]">
            <Input
              type="number"
              value={birthMonth}
              onChange={onDataChange('birth_date_month')}
              placeholder="Month"
              min={1}
              max={12}
            />
            <Input
              type="number"
              value={birthDay}
              onChange={onDataChange('birth_date_day')}
              placeholder="Day"
              min={1}
              max={31}
            />
            <Input
              type="number"
              value={birthYear}
              onChange={onDataChange('birth_date_year')}
              placeholder="Year"
              min={1970}
            />
          </div>
        </div>
        <div className="flex gap-4 flex-wrap items-center">
          <div className="min-w-[100px] shrink-0">
            <Text
              renderBlock={({ children }) => (
                <p className="font-open-sans text-[#2B2B2B] italic">
                  {children}
                </p>
              )}
              propName="gradeLabelText"
            />
          </div>
          <div className="flex gap-x-[23px]">
            {gradeItems.map((grade, idx) => (
              <Circlenumbox
                key={`circle-numbox-${idx}`}
                value={grade}
                isSelected={admission.grade_level.includes(grade)}
                handleSelect={onGradeChange(grade)}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-[29px]">
          <Input
            value={admission.parent_first_name}
            onChange={onDataChange('parent_first_name')}
            placeholder="Parents First Name"
          />
          <Input
            value={admission.parent_last_name}
            onChange={onDataChange('parent_last_name')}
            placeholder="Parents Last Name"
          />
        </div>
        <div className="grid grid-cols-3 gap-x-[29px]">
          <Input
            value={admission.email}
            onChange={onDataChange('email')}
            placeholder="Email"
          />
          <Input
            value={admission.phone_number}
            onChange={onDataChange('phone_number')}
            placeholder="Phone Number"
          />
        </div>
        <div className="grid grid-cols-3 gap-x-[29px]">
          <Input
            value={admission.zipcode}
            onChange={onDataChange('zipcode')}
            placeholder="Zip Code"
          />
        </div>
        <div className="space-y-[25px]">
          <div>
            <RichText
              renderBlock={({ children }) => (
                <p className="font-open-sans text-[#2B2B2B] italic">
                  {children}
                </p>
              )}
              renderH1={({ children }) => (
                <span className="font-poppins font-medium text-[#3365A6] text-xl">
                  {children}
                </span>
              )}
              allowedFeatures={[types.RichTextFeatures.Heading1]}
              propName="aboutText"
            />
          </div>
          <textarea
            value={admission.about}
            onChange={(e: any) => onDataChange('about')(e.target.value)}
            placeholder=""
            className="w-full h-[115px] opacity-50 rounded-[20px] px-[15px] py-[7px] outline-none border-[1px] border-[#E5DFDF]"
          />
        </div>
        <div>
          <RichText
            renderBlock={({ children }) => (
              <p className="font-open-sans text-[#2B2B2B] italic">{children}</p>
            )}
            renderH1={({ children }) => (
              <h1 className="font-poppins font-medium text-[#2B2B2B] text-xl mb-[25px]">
                {children}
              </h1>
            )}
            allowedFeatures={[types.RichTextFeatures.Heading1]}
            propName="reverseText"
            placeholder="Type here..."
          />
        </div>
        <div className="flex flex-wrap gap-x-[100px] w-full mb-[200px]">
          <div className="space-y-4">
            <label
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => onDataChange('fee_type')('ready')}
            >
              <div
                className={`h-[21px] w-[21px] rounded-[21px] border-[1px] border-solid border-[#E5DFDF] shrink-0 cursor-pointer ${
                  admission.fee_type === 'ready' &&
                  'bg-gradient-to-b from-[#FDC830] to-[#F37335]'
                }`}
              ></div>
              <span className="text-gray-700 font-open-sans italic">
                Yes, I am ready to pay $125 to commit my student!
              </span>
            </label>
            <label
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => onDataChange('fee_type')('not-quite')}
            >
              <div
                className={`h-[21px] w-[21px] rounded-[21px] border-[1px] border-solid border-[#E5DFDF] shrink-0 ${
                  admission.fee_type === 'not-quite' &&
                  'bg-gradient-to-b from-[#FDC830] to-[#F37335]'
                }`}
              ></div>
              <span className="text-gray-700 font-open-sans italic">
                No, I am not quite ready to commit my student.
              </span>
            </label>
            <label
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => onDataChange('fee_type')('wait')}
            >
              <div
                className={`h-[21px] w-[21px] rounded-[21px] border-[1px] border-solid border-[#E5DFDF] cursor-pointer shrink-0 ${
                  admission.fee_type === 'wait' &&
                  'bg-gradient-to-b from-[#FDC830] to-[#F37335]'
                }`}
              ></div>
              <span className="text-gray-700 font-open-sans italic">
                Add my child to next year's wait list
              </span>
            </label>
          </div>
          <div className="min-w-[200px] mt-[20px]">
            <Button
              content="Pay Now"
              isLeft={false}
              disabled={admission.fee_type !== 'ready'}
              onClick={onPayClick}
            />
            <Button
              content="Send Now"
              isLeft={false}
              disabled={admission.fee_type === 'ready'}
              onClick={onSubmitClick}
            />
          </div>
        </div>
      </div>
      <div className="font-open-sans text-[#575757] mb-[93.6px]">
        <RichText
          renderBlock={({ children }) => <p className="mb-5">{children}</p>}
          renderH1={({ children }) => (
            <h1 className="font-poppins font-bold text-[36px] text-[#2B2B2B] mb-[20px]">
              {children}
            </h1>
          )}
          renderH2={({ children }) => (
            <h2 className="font-poppins font-medium text-xl text-[#2B2B2B] mb-[20px]">
              {children}
            </h2>
          )}
          allowedFeatures={[
            types.RichTextFeatures.Heading1,
            types.RichTextFeatures.Heading2,
            types.RichTextFeatures.Link,
          ]}
          propName="contactText"
        />
      </div>
    </div>
  )
}

Admissions.schema = {
  name: 'admissions',
  label: 'Admissions',

  getDefaultProps: () => ({}),
}

export { Admissions }
