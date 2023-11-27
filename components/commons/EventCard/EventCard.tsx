import PropTypes from 'prop-types';

export interface IEventCardProps {
  date: string;
  fee: string;
  title: string;
  name: string;
  address: string;
}

export function EventCard({
  date,
  fee,
  title,
  name,
  address,
}: IEventCardProps) {
  return (
    <div className="w-full br-[30px] rounded-[10px] shadow-[0px_2px_10px_#15579914] flex">
      <div className="h-full w-[10px] bg-gradient-to-b from-[#FDC830] to-[#F37335] rounded-l-[10px]"></div>
      <div className="grid gap-y-[23px] my-[30px] mx-[30px] w-full">
        <div className="flex justify-between font-open-sans text-[14px] italic">
          <p className="text-[#575757] ">{date}</p>
          <p className="text-[#155799] font-medium">{fee}</p>
        </div>
        <h1 className="font-poppins font-medium text-[#2B2B2B]">{title}</h1>
        <div className="flex justify-between">
          <div className="flex gap-x-[10px]">
            <div className="w-[25px] h-[25px] rounded-[25px] bg-[#575757] opacity-50"></div>
            <p>{name}</p>
          </div>
          <p className="italic text-[#575757]">{address}</p>
        </div>
      </div>
    </div>
  );
}
