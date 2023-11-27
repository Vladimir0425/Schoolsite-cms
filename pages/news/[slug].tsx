import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'
import moment from 'moment'

import { Button } from '@/components/commons/Button'
import { Rightbar } from '@/components/layout/Rightbar'

import { HttpService } from '@/services'

import { SERVER_URL } from '@/config'

import Combo1 from '@/public/assets/news/img4.svg'
import Combo2 from '@/public/assets/news/img5.svg'
import Combo3 from '@/public/assets/news/img6.svg'

const initialComment = {
  name: '',
  email: '',
  website: '',
  message: '',
}

export default function NewsDetail() {
  const router = useRouter()
  const id = router.query.slug
  const [newsData, setNewsData] = useState<any>({})
  const [comments, setComments] = useState<any[]>([])
  const [comment, setComment] = useState(initialComment)
  const [recentPosts, setRecentPosts] = useState<any[]>([])
  const [recentComments, setRecentComments] = useState<any[]>([])

  const onCommentChange = (field: string) => (e: any) => {
    setComment({ ...comment, [field]: e.target.value })
  }

  const onCommentSubmit = () => {
    const body = { ...comment, parent: id }
    HttpService.post('/comment', body).then((res) => {
      setComments([...comments, comment])
      setComment(initialComment)
    })
  }

  useEffect(() => {
    HttpService.get('/news?latest=true').then((res) => {
      setRecentPosts(res.data)
    })
    HttpService.get('/comment?latest=true').then((res) => {
      setRecentComments(res.data)
    })
  }, [])

  useEffect(() => {
    if (!id) return
    HttpService.get(`/news?id=${id}`).then((res) => {
      setNewsData(res.data[0])
    })
    HttpService.get(`/comment?parent=${id}`).then((res) => {
      setComments(res.data)
    })
  }, [id])

  return (
    <div className="mb-10">
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center w-full aspect-video max-h-[500px] bg-[#90919278] relative overflow-hidden">
          <img
            src={newsData.files ? `${SERVER_URL}/${newsData.files[0]}` : ''}
            className="absolute -z-10 h-full md:h-auto md:w-full md:aspect-video"
          />
          <div className="flex flex-col items-center justify-center w-1/2 py-20">
            <h1 className="text-[#ffffff] text-[60px] font-poppins font-medium text-center mb-[21px]">
              {newsData.title}
            </h1>
            <p className="bg-[#155799] text-[#ffffff] rounded-full px-[25px] mb-[23px] italic">
              Science, Teachers, Rob
            </p>
            <div className="flex gap-[20px] text-[#ffffff]">
              <p>{moment(newsData.created_at).format('MM/DD/YYYY')}</p>
              <p>{newsData.posted_by}</p>
              <p>Teachers, School</p>
            </div>
          </div>
        </div>
        <div className="flex max-w-[1151px] mx-auto mt-[80px] gap-x-10">
          <div className="flex flex-col w-2/3">
            <div className="flex flex-col text-[#575757] font-poppins text-[13px] gap-[30px]">
              <p>
                Donec hendrerit mauris sed tellus consequat, vitae eleifend
                risus posuere. Fusce vulputate dui ultrices mauris iaculis
                ultrices. Praesent hendrerit augue non massa efficitur, varius
                placerat nibh consectetur. Cras maximus semper magna, ut laoreet
                eros bibendum sit amet. Proin ut posuere neque. Curabitur eget
                mauris sit amet lorem faucibus lacinia. Duis sapien tellus,
                aliquam sit amet augue in, feugiat tempus orci.
              </p>
              <p>
                Suspendisse feugiat, est sed dapibus eleifend, lectus nisl
                ullamcorper enim, et ullamcorper mauris ligula ac neque. Ut
                aliquam justo vitae nisi fermentum malesuada. Duis sem eros,
                varius vitae velit eu, mollis convallis turpis. Etiam ante nisl,
                maximus vitae sem non, dignissim tristique tellus. Phasellus at
                risus nec arcu malesuada aliquet. Pellentesque lacus ipsum,
                rutrum sit amet rutrum nec, imperdiet eu velit. Integer posuere
                maximus pulvinar. Integer feugiat mollis neque rhoncus cursus.
              </p>
              <div className="flex gap-[20px]">
                <p>
                  Suspendisse feugiat, est sed dapibus eleifend, lectus nisl
                  ullamcorper enim, et ullamcorper mauris ligula ac neque.
                </p>
                <p>
                  Quisque nunc tellus, sodales aliquam mauris in, placerat
                  blandit quam. In ornare et nisi eget tempus.
                </p>
                <p>
                  Nullam dui nulla, consequat gravida tellus a, euismod cursus
                  eros. Quisque ut lacus ligula. In sollicitudin dui
                </p>
              </div>
            </div>

            <div className="flex mt-[30px] text-[#575757] font-poppins text-[13px] gap-[30px]">
              <div className="">
                <h1 className="text-[#000000] text-[16px] font-medium mb-[13px]">
                  Unordered List
                </h1>
                <p className="mb-[5px]">
                  Etiam ante nisl, maximus vitae sem non, dignissim
                </p>
                <p className="mb-[5px]">
                  Donec blandit, sapien eu porttitor blandit
                </p>
                <p>Sed at urna at massa viverra feugiat non</p>
              </div>
              <div className="">
                <h1 className="text-[#000000] text-[16px] font-medium mb-[13px]">
                  Ordered List
                </h1>
                <p className="mb-[5px]">
                  1. Etiam ante nisl, maximus vitae sem non, dignissim
                </p>
                <p className="mb-[5px]">
                  2. Donec blandit, sapien eu porttitor blandit
                </p>
                <p>3. Sed at urna at massa viverra feugiat non</p>
              </div>
            </div>

            <div className="flex flex-col text-[#575757] mt-[30px] gap-[30px]">
              <p>
                In ornare et nisi eget tempus. Integer imperdiet sit amet nisi
                vel elementum. Pellentesque commodo, tellus vel ultricies
                sodales, eros metus dapibus dolor, in elementum ex turpis ornare
                nisl. Quisque dictum lorem eros, nec porta tellus aliquet in. Ut
                id consectetur felis. Praesent tincidunt metus nec tortor
                fringilla porttitor. Quisque pretium sapien ut mattis commodo.
              </p>
              <div className="flex flex-col border-[1px] px-[86px] py-[60px] rounded-[20px]">
                <img src={Combo1} className="w-[30px] h-[30px] ml-[-5%]" />
                <div className="flex flex-col items-center justify-center text-center text-[#000000] font-medium">
                  <h1 className="mb-[20px]">
                    Nullam erat dolor, hendrerit id turpis laoreet, congue
                    dapibus odio. Duis tempor eros tortor, a ornare arcu egestas
                    quis. Donec vehicula eget quam maximus interdum. Duis
                    ultrices sapien
                  </h1>
                  <div className="flex flex-col items-center justify-center">
                    <img src={Combo3} className="absolute" />
                    <p className="text-[#575757] text-[13px]">
                      Polina Podolski
                    </p>
                    <p className="text-[#F37335] text-[12px] italic">Mother</p>
                  </div>
                </div>
                <img src={Combo2} className="w-[50px] h-[50px] ml-[95%]" />
              </div>
              <p>
                Suspendisse feugiat, est sed dapibus eleifend, lectus nisl
                ullamcorper enim, et ullamcorper mauris ligula ac neque. Ut
                aliquam justo vitae nisi fermentum malesuada. Duis sem eros,
                varius vitae velit eu, mollis convallis turpis. Etiam ante nisl,
                maximus vitae sem non, dignissim tristique tellus. Phasellus at
                risus nec arcu malesuada aliquet.
              </p>
              <p>
                Duis a nibh id metus laoreet hendrerit ut non orci. Nam lacinia
                urna ex, et vestibulum nibh pretium ut. Sed venenatis euismod
                sapien, vel porta metus consectetur non. Sed suscipit auctor
                urna quis imperdiet. Mauris libero ex, cursus at semper sit
                amet, gravida id libero.
              </p>
              <div className="border-[1px]" />
            </div>

            <div className="flex flex-col mt-[80px]">
              <h2 className="text-[35px] font-poppins mb-[23px]">Comments</h2>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="flex items-center gap-[15px] font-poppins"
                  >
                    <div className="w-[70px] h-[70px] bg-[gray] rounded-full shrink-0" />
                    <div className="flex flex-col grow">
                      <div className="flex gap-[20px] items-center">
                        <h4>{comment.name}</h4>
                        <p className="text-[#575757] text-[13px]">
                          {moment(comment.date).format('MM/DD/YYYY')}
                        </p>
                      </div>
                      <p className="text-[#575757] text-[13px] line-clamp-2">
                        {comment.message}
                      </p>
                      <p className="ml-[calc(100%-50px)] text-[#575757] font-poppins">
                        REPLY
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col mt-[80px]">
              <h1 className="text-[35px] font-poppins mb-[35px]">
                Add Comment
              </h1>
              <div className="flex justify-between gap-[10px]">
                <input
                  placeholder="Name"
                  value={comment.name}
                  onChange={onCommentChange('name')}
                  className="border-[1px] rounded-full px-[15px] py-[9px] font-poppins italic w-full lg:w-auto"
                />
                <input
                  placeholder="Email"
                  value={comment.email}
                  onChange={onCommentChange('email')}
                  className="border-[1px] rounded-full px-[15px] py-[9px] font-poppins italic w-full lg:w-auto"
                />
                <input
                  placeholder="Website"
                  value={comment.website}
                  onChange={onCommentChange('website')}
                  className="border-[1px] rounded-full px-[15px] py-[9px] font-poppins italic w-full lg:w-auto"
                />
              </div>

              <textarea
                placeholder="Message"
                value={comment.message}
                onChange={onCommentChange('message')}
                className="rounded-[20px] border-[1px] px-[15px] py-[9px] font-poppins italic mt-[20px] min-h-[115px]"
              />
              <div className="w-[192px] ml-[calc(100%-192px)] mb-[130px]">
                <Button
                  content="Send Now"
                  isLeft={true}
                  onClick={onCommentSubmit}
                />
              </div>
            </div>
          </div>

          <Rightbar recentPosts={recentPosts} recentComments={recentComments} />
        </div>
      </div>
    </div>
  )
}
