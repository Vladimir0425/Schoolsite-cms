import { useRouter } from 'next/router'
import { useState } from 'react'
import Calendar from 'react-calendar'

import { Input } from '@/components/forms/Input'

import moment from 'moment'

import styles from './Rightbar.module.scss'
import 'react-calendar/dist/Calendar.css'

export interface IRIghtbarProps {
  recentPosts: any[]
  recentComments: any[]
}

export function Rightbar({ recentPosts, recentComments }: IRIghtbarProps) {
  const router = useRouter()
  const [date, onDateChange] = useState(new Date())

  const navigate = (path: string) => {
    router.push(path)
  }

  const onCommentClick = (path: string) => () => {
    navigate(path)
  }

  return (
    <div className="col-span-5 md:col-span-2 mt-[0px]">
      <div className="grid">
        <Input placeholder="search" />
        <h1 className="mt-[40px] mb-[25px] text-[#2B2B2B] border-[1px] border-solid border-[#F37335] text-center text-[20px] font-poppins font-medium py-[8px] rounded-[23px]">
          Categories
        </h1>
        <div className="flex justify-between mx-[20px] mb-[35px]">
          <div className="font-poppins text-[#2B2B2B] text-[18px] grid gap-y-[5px]">
            <p>Teachers</p>
            <p>School News</p>
            <p>Lessons</p>
            <p>Rob</p>
          </div>
          <div className="font-poppins text-[#2B2B2B] text-[18px] italic grid gap-y-[5px]">
            <p>45</p>
            <p>13</p>
            <p>6</p>
            <p>89</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-[#2B2B2B] border-[1px] border-solid border-[#F37335] text-center text-[20px] font-poppins font-medium py-[8px] rounded-[23px]">
          Latest Posts
        </h1>
        <div className="grid mx-[20px] mt-[25px] gap-y-[18px]">
          {recentPosts.map((post) => (
            <div
              key={post._id}
              className="flex gap-x-[10px] cursor-pointer"
              onClick={() => navigate(`/news/${post._id}`)}
            >
              <div className="w-[50px] h-[50px] bg-[#D8D8D8] rounded-[5px]" />
              <div>
                <p className="font-poppins text-[#2B2B2B] text-sm">
                  {post.title}
                </p>
                <p className="font-poppins text-[#575757] text-sm">
                  {moment(post.date).format('MM/DD/YYYY')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[43px] mb-[38px]">
        <h1 className="mb-[25px] text-[#2B2B2B] border-[1px] border-solid border-[#F37335] text-center text-[20px] font-poppins font-medium py-[8px] rounded-[23px]">
          Recent Comments
        </h1>
        <div className="grid mx-[20px] font-poppins text-[#575757] text-sm gap-y-[13px]">
          {recentComments.map((comment) => (
            <p
              key={comment._id}
              className="line-clamp-1 cursor-pointer"
              onClick={onCommentClick(`/news/${comment.parent}`)}
            >
              <strong>{comment.name}</strong> <span className="italic">in</span>{' '}
              {comment.message}
            </p>
          ))}
        </div>
      </div>
      <div>
        <h1 className="mb-[25px] text-[#2B2B2B] border-[1px] border-solid border-[#F37335] text-center text-[20px] font-poppins font-medium py-[8px] rounded-[23px]">
          Archives
        </h1>
        <div className="mt-[25px] mx-[20px] font-poppins font-medium text-[#2B2B2B]">
          <p>December</p>
          <p>January</p>
          <p>February</p>
          <p>March</p>
        </div>
      </div>
      <div className="mt-[38px]">
        <h1 className="mb-[25px] text-[#2B2B2B] border-[1px] border-solid border-[#F37335] text-center text-[20px] font-poppins font-medium py-[8px] rounded-[23px]">
          Tags
        </h1>
        <div className="mt-[25px] mx-[20px] font-poppins font-medium text-[#2B2B2B] flex flex-wrap gap-1">
          {['Teachers', 'Lessons', 'School', 'Theme', 'Class'].map((item) => (
            <p
              key={item}
              className="px-[10px] py-[5px] border-[1px] border-solid border-[#575757] text-center rounded-[15px]"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-[38px]">
        <h1 className="mb-[25px] text-[#2B2B2B] border-[1px] border-solid border-[#F37335] text-center text-[20px] font-poppins font-medium py-[8px] rounded-[23px]">
          Calendar
        </h1>
        <div className={styles.calendar}>
          <Calendar value={date} />
        </div>
      </div>
    </div>
  )
}
