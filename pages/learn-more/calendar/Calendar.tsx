import { useState, useEffect, useMemo } from 'react';

import clsx from 'clsx';
import moment from 'moment';

import { HttpService } from '@/services';

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const ranges = [
  '8 AM - 10 AM',
  '10 AM - 12 AM',
  '12 AM - 14 AM',
  '14 AM - 16 AM',
  '16 AM - 17 AM',
];

export function Calendar() {
  const [curGrade, setGrade] = useState(4);
  const [schedules, setSchedules] = useState([]);

  const isScheduleExist = (weekday: number, order: number) => {
    const theDay = new Date(
      moment().day(weekday).format('YYYY-MM-DD'),
    ).toISOString();
    const schedule: any =
      gradeSchedules.find((item: any) => item.date === theDay) || {};
    const schedules: string[] = schedule.schedules || [];
    return !!schedules[order] && schedules[order] !== '';
  };

  const daySchedule = (weekday: number, order: number) => {
    const theDay = new Date(
      moment().day(weekday).format('YYYY-MM-DD'),
    ).toISOString();
    const schedule: any = gradeSchedules.find(
      (item: any) => item.date === theDay,
    );
    const schedules: string[] = schedule.schedules || [];
    return schedules[order];
  };

  const gradeSchedules = useMemo(() => {
    return schedules.filter((item: any) => item.grade === curGrade);
  }, [curGrade, schedules]);

  useEffect(() => {
    const fromDay = moment().weekday(0).format('YYYY-MM-DD'),
      toDay = moment().weekday(6).format('YYYY-MM-DD');

    HttpService.get(`/calendar?from=${fromDay}&to=${toDay}`).then(res => {
      setSchedules(res.data);
    });
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-y-2 items-center max-w-[1024px] mx-auto py-10">
        <ul className="flex gap-x-2">
          {[4, 5, 6, 7, 8].map((grade: number, index: number) => (
            <li
              key={index}
              className={`cursor-pointer rounded-full border border-gray-300 px-6 py-1 text-xs font-poppins ${
                curGrade === grade ? 'border-orange-400 text-orange-400' : ''
              }`}
              onClick={() => setGrade(grade)}
            >
              {grade}th grade
            </li>
          ))}
        </ul>
        <div className="w-full">
          <div className="grid grid-cols-7">
            {weekdays.map((weekday: string, dayIndex: number) => (
              <div key={weekday} className="flex flex-col">
                <span
                  className={clsx(
                    'py-2 text-lg text-center bg-[#F2F7FD] border-0.5 border-[#BBBBBB] font-poppins',
                    dayIndex === 0
                      ? 'rounded-tl-xl'
                      : dayIndex === 6
                      ? 'rounded-tr-xl'
                      : '',
                  )}
                >
                  {weekday}
                </span>
                {[0, 1, 2, 3, 4].map((order: number) => (
                  <div
                    key={`${weekday}-${order}`}
                    className={clsx(
                      'w-full h-[200px] flex flex-col items-center justify-between border border-gray-200 py-6 px-5',
                      !isScheduleExist(dayIndex, order)
                        ? 'bg-white'
                        : order % 2 == 0
                        ? 'bg-gradient-to-b from-[#FDC830] to-[#F37335]'
                        : 'bg-gradient-to-b from-[#159957] to-[#155799]',
                    )}
                  >
                    {isScheduleExist(dayIndex, order) && (
                      <>
                        <p className="text-white text-base font-poppins w-full break-words text-center">
                          {daySchedule(dayIndex, order)}
                        </p>
                        <span className="text-[#E5DFDF] italic font-poppins break-words text-center">
                          {ranges[order]}
                        </span>
                      </>
                    )}
                    <p></p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
