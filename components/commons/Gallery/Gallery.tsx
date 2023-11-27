import { useState } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import clsx from 'clsx';

import { SERVER_URL } from '@/config';

export interface IGalleryProps {
  files: string[];
}

export function Gallery({ files }: IGalleryProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  const onPrevSlide = (e: any) => {
    e.stopPropagation();
    if (slideIndex === 0) return;
    setSlideIndex(slideIndex - 1);
  };

  const onNextSlide = (e: any) => {
    e.stopPropagation();
    if (slideIndex === files.length - 1) return;
    setSlideIndex(slideIndex + 1);
  };

  return (
    <div className="flex items-center overflow-x-hidden relative w-full aspect-video">
      <span
        className="rounded-full w-12 h-12 bg-gradient-to-b from-[#FDC830] to-[#F37335] absolute top-1/2 left-4 transform -translate-y-1/2 flex items-center justify-center cursor-pointer"
        onClick={onPrevSlide}
      >
        <FaArrowLeftLong fill="white" size={24} />
      </span>
      {files.map((path: string, index: number) => (
        <img
          key={path}
          src={`${SERVER_URL}/${path}`}
          className={clsx(
            'transtition-transform transform w-full aspect-auto shrink-0 -z-10 rounded-3xl duration-300 absolute h-full',
            index === slideIndex
              ? 'translate-x-0'
              : index < slideIndex
              ? '-translate-x-full'
              : 'translate-x-full',
          )}
        />
      ))}
      <span
        className="rounded-full w-12 h-12 bg-gradient-to-b from-[#FDC830] to-[#F37335] absolute top-1/2 right-4 transform -translate-y-1/2 flex items-center justify-center cursor-pointer"
        onClick={onNextSlide}
      >
        <FaArrowRightLong fill="white" size={24} />
      </span>
    </div>
  );
}
