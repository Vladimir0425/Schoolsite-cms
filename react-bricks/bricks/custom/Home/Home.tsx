import { RichText, types } from 'react-bricks/frontend'
import { Text, Image as BImage } from 'react-bricks/frontend'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import moment from 'moment'
import clsx from 'clsx'
import { validate } from 'email-validator'

import { HttpService } from '@/services'

import { SERVER_URL } from '@/config'

import EduIcon from '@/public/assets/home/education.svg'
import AtomIcon from '@/public/assets/home/atom.svg'
import HatIcon from '@/public/assets/home/mortarboard.svg'
import Charac1Icon from '@/public/assets/home/charac1.png'
import Charac2Icon from '@/public/assets/home/charac2.png'
import Charac3Icon from '@/public/assets/home/charac3.png'
import Charac4Icon from '@/public/assets/home/charac4.png'
import styles from './Home.module.scss'
import { useSnackbar } from 'notistack'

const initialTexts = [
  {
    title: 'Engagged',
    description:
      'Our commitment to student engagement goes beyond the ordinary. We continuously assess and nurture their unique strengths, ensuring they are not just involved but fully immersed',
    image: HatIcon,
    textPropName: 'engagedText',
  },
  {
    title: 'Ensured',
    description:
      'We are dedicated to creating educational environments where the safety, well-being, and emotional health of students, educators, and staff are safeguarded, protecting them from physical, emotional, and psychological harm. Our goal is to cultivate a conducive atmosphere for effective learning alongside a strong commitment to safety and mental health..',
    image: EduIcon,
    textPropName: 'ensuredText',
  },
  {
    title: 'Equiped',
    description:
      'At Atlas, we are passionately committed to preparing our students not just for the classroom but for a lifetime of success. We strive to equip each Atlas student with the skills and knowledge READ MORE',
    image: AtomIcon,
    textPropName: 'equipedText',
  },
]

const initialCollapsed = Array(initialTexts.length)
  .fill(true)
  .map((_, index) => (index === 0 ? false : _))

interface HomeProps {}

const Home: types.Brick<HomeProps> = () => {
  const router = useRouter()
  const pathname = router.pathname

  const { enqueueSnackbar } = useSnackbar()

  const [isChanged, setIsChanged] = useState<boolean>(false)
  const [newsData, setNewsData] = useState<any[]>([])
  const [subscriber, setSubscriber] = useState('')
  const [isTextCollapsed, setIsTextCollapsed] =
    useState<boolean[]>(initialCollapsed)
  const isAdmin = useMemo(() => {
    return pathname.startsWith('/admin')
  }, [pathname])

  const navigate = (path: string) => {
    router.push(path)
  }

  const onWindowResize = (e: UIEvent) => {
    if (window.innerWidth > 768) {
      setIsChanged(false)
    } else {
      setIsChanged(true)
    }
  }

  const onReadMoreClick = (index: number) => () => {
    setIsTextCollapsed(
      isTextCollapsed.map((state, _index) =>
        index === _index ? !state : state
      )
    )
  }

  const onReadBlockClick = (id: string) => {
    navigate(`/news/${id}`)
  }

  const onSubscribeClick = () => {
    if (subscriber === '' || !validate(subscriber)) {
      enqueueSnackbar('Input invalid!', { variant: 'warning' })
      return
    }

    HttpService.post('/subscriber', { email: subscriber })
      .then((res) => {
        const { status } = res.data
        if (status === 200) {
          enqueueSnackbar('Subscribe success!', { variant: 'success' })
          return
        } else {
          enqueueSnackbar('Duplicated subscriber!', { variant: 'warning' })
        }
      })
      .catch((err) => {
        enqueueSnackbar('Subscribe fail!', { variant: 'error' })
      })
  }

  useEffect(() => {
    window.addEventListener('resize', onWindowResize)

    HttpService.get('/news?latest=true').then((res) => {
      setNewsData(res.data)
    })
  }, [])

  return (
    <div className={styles.root}>
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-[106px]">
        <div className="mt-[22px]">
          <div className="text-center lg:text-left">
            <RichText
              renderBlock={({ children }) => (
                <div className="text-4xl container:leading-[64px] container:text-[55px] font-[500] font-poppins">
                  {children}
                </div>
              )}
              renderH1={({ children }) => (
                <h1 className="text-[#3365A6] max-w-[400px] text-4xl container:leading-[64px] container:text-[55px] font-[500] font-poppins">
                  {children}
                </h1>
              )}
              renderH2={({ children }) => (
                <h2 className="text-[#7891BF] text-4xl container:leading-[64px] container:text-[55px] font-[500] font-poppins">
                  {children}
                </h2>
              )}
              renderH3={({ children }) => (
                <h3 className="text-[#C1C1C1] text-4xl container:leading-[64px] container:text-[55px] font-[500] font-poppins">
                  {children}
                </h3>
              )}
              allowedFeatures={[
                types.RichTextFeatures.Heading1,
                types.RichTextFeatures.Heading2,
                types.RichTextFeatures.Heading3,
              ]}
              propName="headText"
              placeholder="Type heading text here..."
            />

            {/* <h1 > */}
            {/* <Text
                renderBlock={(props) => (
                  <span className="text-[#3365A6]">{props.children}</span>
                )}
                placeholder={'Type here...'}
                propName="mainHead1"
              />{' '}
              <br />
              <Text
                renderBlock={(props) => (
                  <span className="text-[#7891BF]">{props.children}</span>
                )}
                placeholder={'Type here...'}
                propName="mainHead2"
              />{' '}
              <br />
              <Text
                renderBlock={(props) => (
                  <span className="text-[#C1C1C1]">{props.children}</span>
                )}
                placeholder={'Type here...'}
                propName="mainHead3"
              />
            </h1> */}
            <Text
              renderBlock={(props) => (
                <p className="text-[#575757] mb-[20px] text-xm">
                  {props.children}
                </p>
              )}
              placeholder="Type here..."
              propName="mainText"
            />
          </div>
          <div className="flex flex-row w-full h-[50px] items-center relative mt-[29px] mb-[41px] -z-1">
            <input
              value={subscriber}
              placeholder="Sign up for updates simply enter your email"
              className="w-full text-[#575757] py-[14px] pl-[24.28px] italic border-solid  border-[2px] border-[#F2EFEF] rounded-[50px] outline-none shadow-[0px_2px_10px_#15579914]"
              onChange={(e: any) => setSubscriber(e.target.value)}
            />
            <h2
              className="p-[10px] rounded-full bg-[#3365A6] text-[white] cursor-pointer absolute right-1 font-poppins font-medium"
              onClick={onSubscribeClick}
            >
              GO
            </h2>
          </div>
          <Text
            renderBlock={(props) => (
              <h1 className="text-center text-3xl mb-[30px] lg:text-left lg:text-4xl font-poppins font-bold  text-[#2B2B2B]">
                {props.children}
              </h1>
            )}
            placeholder="Now enrolling 4th-8th grade students for Fall 2024 in the Southern Boca Raton"
            propName="enrollText"
          />
        </div>
        <div className="sm:flex sm:justify-between sm:mx-[20px] lg:flex lg:gap-x-[24px] sm:relative h-0 sm:h-[600px]">
          <Image
            alt="Bubble1"
            src={Charac1Icon}
            className="animate-fadeInUp1 absolute top-0 sm:right-0 sm:left-0 -z-20 w-2/5 -right-3"
          />
          <span className="hidden sm:flex animate-fadeInUp1 absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-gradient-to-b from-[#FDC830] to-[#F37335] -z-30" />
          <Image
            alt="Bubble2"
            src={Charac2Icon}
            className="hidden sm:flex animate-fadeInUp3 absolute bottom-[100px] left-[18%] -z-20"
          />
          <span className="hidden sm:flex animate-fadeInUp1 absolute top-[200px] left-1/2 w-[50px] h-[50px] rounded-full bg-gradient-to-b from-[#FDC830] to-[#F37335] -z-10" />
          <Image
            alt="Bubble3"
            src={Charac3Icon}
            className="hidden sm:flex animate-fadeInUp2 absolute right-0 top-[200px] -z-20"
          />
          <span className="hidden sm:flex animate-fadeInUp1 absolute top-1/2 left-0 w-20 h-20 bg-[#FDC830] rounded-full -z-10" />
          <Image
            alt="Bubble4"
            src={Charac4Icon}
            className="hidden sm:flex animate-fadeInUp4 absolute bottom-0 right-[10%] -z-20"
          />
          <span className="hidden sm:flex animate-fadeInUp1 absolute bottom-0 left-[30%] w-10 h-10 bg-gradient-to-b from-[#FDC830] to-[#F37335] rounded-full -z-10" />
          <span className="hidden sm:flex animate-fadeInUp1 absolute -bottom-[50px] -left-8 lg:-left-[100px] w-24 h-24 bg-gradient-to-b from-[#FDC830] to-[#F37335] rounded-full -z-10" />
        </div>
      </div>
      <RichText
        renderBlock={({ children }) => (
          <p className="text-[#2B2B2B] text-center font-poppins font-bold text-4xl md:text-5xl">
            {children}
          </p>
        )}
        renderHighlight={({ children }) => (
          <span className="text-[#F37335]">{children}</span>
        )}
        allowedFeatures={[types.RichTextFeatures.Highlight]}
        propName="welcomeHead"
        placeholder="Type here..."
      />
      <div className="grid grid-cols-1 md:flex md:justify-between md:items-center mt-[67.5px] mb-[30px] md:mb-[171.3px]">
        {initialTexts.map((text: any, index: number) => (
          <div
            key={text.title}
            className={clsx(
              'md:max-w-[33%] shadow-[0px_2px_10px_#15579914] rounded-[10px] px-[20px] pt-[23px] pb-[27.54px]'
            )}
          >
            <div className="flex items-center gap-x-[11.72px] md:flex md:flex-col md:items-start lg:flex lg:flex-row lg:items-center lg:gap-x-[11.72px]">
              <Image alt={`Info-${index}`} src={text.image} />
              <Text
                renderBlock={({ children }) => (
                  <h1 className="min-w-[200px] font-poppins font-medium text-[30px] md:text-[35px] text-[#2B2B2B]">
                    {children}
                  </h1>
                )}
                placeholder="Type here..."
                propName={`welcomeText${index}`}
              />
            </div>
            <Text
              renderBlock={(props) => (
                <p
                  className={clsx(
                    'text-[14px] text-[#575757] font-open-sans',
                    isTextCollapsed[index] === true ? 'line-clamp-3' : ''
                  )}
                >
                  {props.children}
                </p>
              )}
              propName={text.textPropName}
              placeholder="Type here..."
            />
            <span
              className="text-[#F7B500] underline cursor-pointer"
              onClick={onReadMoreClick(index)}
            >
              READ {isTextCollapsed[index] === true ? 'MORE' : 'LESS'}
            </span>
          </div>
        ))}
      </div>
      <RichText
        renderBlock={({ children }) => (
          <p className="text-[#2B2B2B] text-center font-poppins font-bold text-4xl md:text-5xl">
            {children}
          </p>
        )}
        renderHighlight={({ children }) => (
          <span className="text-[#3365A6]">{children}</span>
        )}
        allowedFeatures={[types.RichTextFeatures.Highlight]}
        propName="sliderHead"
        placeholder="Type here..."
      />
      <div className="self-center w-full max-w-[540px]">
        <Text
          renderBlock={(props) => (
            <p className="w-full text-center text-[#575757] text-[14px] font-open-sans mt-[20px]">
              {props.children}
            </p>
          )}
          propName="sliderMainText"
          placeholder="Type here..."
        />
      </div>
      <div className="hidden sm:grid sm:grid-cols-9 md:grid-cols-12 gap-x-4 mt-[15px]">
        {!isChanged ? (
          <>
            <div className="col-span-2 self-center flex">
              <div
                className={isAdmin ? styles.adminViewer : styles.imageViewer}
              >
                <div className={styles.slideImage}>
                  <BImage alt="Person1" propName="sliderImage1" />
                  <div className={styles.imageText}>
                    <Text
                      renderBlock={({ children }) => (
                        <p className="text-center">{children}</p>
                      )}
                      propName="sliderTitle1"
                      placeholder="Type title here..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 space-y-5 flex flex-col">
              <div
                className={isAdmin ? styles.adminViewer : styles.imageViewer}
              >
                <div className={styles.slideImage}>
                  <BImage alt="Person2" propName="sliderImage2" />
                  <div className={styles.imageText}>
                    <Text
                      renderBlock={({ children }) => (
                        <p className="text-center">{children}</p>
                      )}
                      propName="sliderTitle2"
                      placeholder="Type title here..."
                    />
                  </div>
                </div>
              </div>
              <div
                className={isAdmin ? styles.adminViewer : styles.imageViewer}
              >
                <div className={styles.slideImage}>
                  <BImage alt="Person3" propName="sliderImage3" />
                  <div className={styles.imageText}>
                    <Text
                      renderBlock={({ children }) => (
                        <p className="text-center">{children}</p>
                      )}
                      propName="sliderTitle3"
                      placeholder="Type title here..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 flex flex-col space-y-5 pt-[30px]">
              <div
                className={isAdmin ? styles.adminViewer : styles.imageViewer}
              >
                <div className={styles.slideImage}>
                  <BImage alt="Person4" propName="sliderImage4" />
                  <div className={styles.imageText}>
                    <Text
                      renderBlock={({ children }) => (
                        <p className="text-center">{children}</p>
                      )}
                      propName="sliderTitle4"
                      placeholder="Type title here..."
                    />
                  </div>
                </div>
              </div>
              <div
                className={isAdmin ? styles.adminViewer : styles.imageViewer}
              >
                <div className={styles.slideImage}>
                  <BImage alt="Person5" propName="sliderImage5" />
                  <div className={styles.imageText}>
                    <Text
                      renderBlock={({ children }) => (
                        <p className="text-center">{children}</p>
                      )}
                      propName="sliderTitle5"
                      placeholder="Type title here..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 flex flex-col space-y-5 pt-[70px]">
              <div
                className={isAdmin ? styles.adminViewer : styles.imageViewer}
              >
                <div className={styles.slideImage}>
                  <BImage alt="Person6" propName="sliderImage6" />
                  <div className={styles.imageText}>
                    <Text
                      renderBlock={({ children }) => (
                        <p className="text-center">{children}</p>
                      )}
                      propName="sliderTitle6"
                      placeholder="Type title here..."
                    />
                  </div>
                </div>
              </div>
              <div
                className={isAdmin ? styles.adminViewer : styles.imageViewer}
              >
                <div className={styles.slideImage}>
                  <BImage alt="Person7" propName="sliderImage7" />
                  <div className={styles.imageText}>
                    <Text
                      renderBlock={({ children }) => (
                        <p className="text-center">{children}</p>
                      )}
                      propName="sliderTitle7"
                      placeholder="Type title here..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div
                className={clsx(
                  isAdmin ? styles.adminViewer : styles.imageViewer,
                  'mb-[20px]'
                )}
              >
                <div className={styles.slideImage}>
                  <BImage alt="Person8" propName="sliderImage8" />
                  <div className={styles.imageText}>
                    <Text
                      renderBlock={({ children }) => (
                        <p className="text-center">{children}</p>
                      )}
                      propName="sliderTitle8"
                      placeholder="Type title here..."
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-x-4">
                <div
                  className={clsx(
                    isAdmin ? styles.adminViewer : styles.imageViewer,
                    'col-span-2'
                  )}
                >
                  <div className={styles.slideImage}>
                    <BImage alt="Person9" propName="sliderImage9" />
                    <div className={styles.imageText}>
                      <Text
                        renderBlock={({ children }) => (
                          <p className="text-center">{children}</p>
                        )}
                        propName="sliderTitle9"
                        placeholder="Type title here..."
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={isAdmin ? styles.adminViewer : styles.imageViewer}
                >
                  {/* <div className={styles.slideImage}>
                    <BImage alt="Person10" propName="sliderImage10" />
                    <div className={styles.imageText}>
                      <Text
                        renderBlock={({ children }) => (
                          <p className="text-center">{children}</p>
                        )}
                        propName="sliderTitle10"
                        placeholder="Type title here..."
                      />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full text-center clear-left mt-[80px] mb-[208px]">
        {/* <Text
          renderBlock={({ children }) => (
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-[#2B2B2B]">
              {children}
            </h1>
          )}
          propName="newsHead"
          placeholder="Type news here..."
        /> */}
        {/* <Text
          renderBlock={({ children }) => (
            <p className="font-open-sans text-[#575757] text-[14px] pb-[15px] mb-[38px]">
              {children}
            </p>
          )}
          propName="newsText"
          placeholder="Type news here..."
        /> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5">
          {newsData.map((item: any, index: number) => (
            <div className="flex flex-col">
              <Image
                alt={`News-${index}`}
                src={`${SERVER_URL}/${item.files[0]}`}
                width={100}
                height={100}
                className="mb-[21px] w-full aspect-video"
              />
              <div className="text-left px-[20px]">
                <div className="flex justify-between mb-[13px]">
                  <p className="font-open-sans text-[14px] text-[#575757]">
                    {moment(item.created_at).format('MM/DD/YYYY')}
                  </p>
                  <p className="font-open-sans text-[14px] text-[#575757]">
                    by {item.posted_by}
                  </p>
                  <p className="font-open-sans text-[14px] text-[#575757] italic"></p>
                </div>
                <h1 className="font-poppins font-medium text-[20px] text-[#2B2B2B] mb-[5px]">
                  {item.title}
                </h1>
                <p className="font-open-sans text-[14px] text-[#575757] mb-[16px] line-clamp-3">
                  {item.content}
                </p>
                <a
                  className="font-open-sans text-[14px] text-[#155799] hover:underline cursor-pointer"
                  onClick={() => onReadBlockClick(item._id)}
                >
                  Read
                </a>
              </div>
            </div>
          ))}
        </div> */}
      </div>
      <div className="absolute top-0 right-0 transform translate-x-[16%] -translate-y-[14%] w-1/2 aspect-square rounded-full bg-[#F2F7FD] -z-30" />
    </div>
  )
}

Home.schema = {
  name: 'Home',
  label: 'Home',
  mapExternalDataToProps: (data, brickProps) => ({}),
  getDefaultProps: () => ({}),

  sideEditProps: [],
}

export { Home }
