import { useState, useEffect } from 'react';

import { EventCard } from '@/components/commons/EventCard';
import { HttpService } from '@/services';

import moment from 'moment';

interface IEventItem {
  date: string;
  fee: string;
  title: string;
  name: string;
  address: string;
}

export function Events() {
  const [events, setEvents] = useState<IEventItem[]>([]);

  useEffect(() => {
    HttpService.get('/event').then(res => {
      const data = res.data;
      const resData = data.map((item: any) => ({
        id: item._id,
        date: `${moment(item.start_time).format('MM/DD/YYYY')} ${moment(
          item.start_time,
        ).format('HA')} to ${moment(item.end_date).format('HA')}`,
        name: item.author,
        title: item.name,
        fee: item.price === 0 ? 'FREE' : `$${item.price}`,
        address: item.address,
      }));
      setEvents(resData);
    });
  }, []);

  return (
    <div>
      <div className="mt-[137px] mb-[50px] grid grid-cols-1 gap-x-[19px] gap-y-[30px] md:grid-cols-2 max-w-[1153px] mx-auto">
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
  );
}
