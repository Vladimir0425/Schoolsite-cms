import { types } from 'react-bricks/frontend'

import { useState, useEffect } from 'react'

import { EventCard } from '@/components/commons/EventCard'
import { HttpService } from '@/services'

import moment from 'moment'

interface IEventItem {
  date: string
  fee: string
  title: string
  name: string
  address: string
}

interface IEventsProps {}

const Events: types.Brick<IEventsProps> = () => {
  const [events, setEvents] = useState<IEventItem[]>([])

  useEffect(() => {
    HttpService.get('/event').then((res) => {
      const data = res.data
      const resData = data.map((item: any) => ({
        id: item._id,
        date: `${moment(item.start_time).format('MM/DD/YYYY')} ${moment(
          item.start_time
        ).format('HA')} to ${moment(item.end_date).format('HA')}`,
        name: item.author,
        title: item.name,
        fee: item.price === 0 ? 'FREE' : `$${item.price}`,
        address: item.address,
      }))
      setEvents(resData)
    })
  }, [])

  return (
    <div className="max-w-screen-container px-4 container:px-0 mx-auto w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 py-24">
        {events.map((item: any) => (
          <EventCard
            key={item.id}
            date={item.date}
            fee={item.fee}
            title={item.title}
            name={item.name}
            address={item.address}
          />
        ))}
      </div>
    </div>
  )
}

Events.schema = {
  name: 'events',
  label: 'Events',

  getDefaultProps: () => ({}),
  sideEditProps: [],
}

export { Events }
