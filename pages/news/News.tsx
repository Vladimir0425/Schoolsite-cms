import { useState, useEffect, useRef } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa6'

import { useRouter } from 'next/router'

import clsx from 'clsx'
import moment from 'moment'

import { Gallery } from '@/components/commons/Gallery/Gallery'
import { Rightbar } from '@/components/layout/Rightbar'

import { HttpService } from '@/services'

import { SERVER_URL } from '@/config'

export function News() {
  const router = useRouter()
  const [newsData, setNewsData] = useState<any[]>([])
  const [recentPosts, setRecentPosts] = useState<any[]>([])
  const [recentComments, setRecentComments] = useState<any[]>([])

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMediaPlay, setMediaPlay] = useState(false)

  const navigate = (path: string) => {
    router.push(path)
  }

  const onVideoPlay = (e: any) => {
    e.stopPropagation()
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setMediaPlay(true)
    } else {
      videoRef.current.pause()
      setMediaPlay(false)
    }
  }

  useEffect(() => {
    HttpService.get('/news').then((res) => {
      setNewsData(res.data)
    })
    HttpService.get('/news?latest=true').then((res) => {
      setRecentPosts(res.data)
    })
    HttpService.get('/comment?latest=true').then((res) => {
      setRecentComments(res.data)
    })
  }, [])

  return (
    <div>
      <div className="max-w-screen-container mx-auto grid grid-cols-5 md:grid-cols-7 gap-x-[20px] mb-20">
        <div className="col-span-5 grid grid-cols-1 gap-y-20">
          {newsData.map((newsItem) => (
            <div
              key={newsItem._id}
              className="space-y-4"
              onClick={() => navigate(`/news/${newsItem._id}`)}
            >
              <div className="relative w-full">
                {newsItem.type === 'Video' ? (
                  <div className="relative flex items-center justify-center">
                    <video
                      src={`${SERVER_URL}/${newsItem.files[0]}`}
                      className="relative w-full aspect-video"
                      ref={videoRef}
                    ></video>
                    <span
                      className={clsx(
                        'bg-gray-200/70 rounded-full w-10 h-10 flex items-center justify-center absolute left-1/2 top-1/2 transition-all duration-300 hover:bg-gray-400/90',
                        isMediaPlay ? 'opacity-0 hover:opacity-100' : ''
                      )}
                      onClick={onVideoPlay}
                    >
                      {isMediaPlay ? (
                        <FaPause fill="white" />
                      ) : (
                        <FaPlay fill="white" />
                      )}
                    </span>
                  </div>
                ) : newsItem.type === 'Audio' ? (
                  <audio src={`${SERVER_URL}/${newsItem.files[0]}`}></audio>
                ) : newsItem.type === 'Without Image' ? (
                  <></>
                ) : newsItem.type === 'Gallery' ? (
                  <Gallery files={newsItem.files} />
                ) : (
                  <img
                    src={`${SERVER_URL}/${newsItem.files[0]}`}
                    className="rounded-lg aspect-video"
                  />
                )}
                <span className="absolute left-4 bottom-0 transform translate-y-1/2 bg-[#FFD31D] rounded-full italic text-sm">
                  {newsItem.tags}
                </span>
              </div>
              <div className="flex gap-x-2 text-sm">
                <p>{moment(newsItem.created_at).format('MM/DD/YYYY')}</p>
                <p>by {newsItem.posted_by}</p>
                <p className="italic">{newsItem.keywords}</p>
              </div>
              <h1 className="text-4xl text-[#2B2B2B] font-poppins font-medium">
                {newsItem.title}
              </h1>
              <p className="font-open-sans text-[#575757] text-sm">
                {newsItem.content}
              </p>
            </div>
          ))}
        </div>
        <Rightbar recentPosts={recentPosts} recentComments={recentComments} />
      </div>
    </div>
  )
}
