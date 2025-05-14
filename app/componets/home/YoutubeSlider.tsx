'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import styles from './YoutubeSlider.module.css';
import { useEffect, useState } from 'react';
import { getYoutubeData, YoutubeItem } from '@/mocks/youtube-handlers';

export default function VideoSlider() {
  const [youtubeData, setYoutubeData] = useState<YoutubeItem[]>([]);

  useEffect(() => {
    setYoutubeData(getYoutubeData());
  }, []);

  return (
    <div className="bg-[#333] w-full">
      <div className={styles.slider}>
        <div className="">
          <Swiper
            className="swiper-wrapper"
            modules={[Navigation, Pagination, Scrollbar]}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
          >
            {youtubeData.map((youtube) => (
              <SwiperSlide key={youtube.id}>
                <div className="video-container flex flex-col justify-center items-center h-[723px] max-md:w-[100%]  max-sm:h-[400px] max-sm:mb-[50px]">
                  <iframe
                    width={100}
                    height={100}
                    src={`https://www.youtube.com/embed/${youtube.id}`}
                    title={youtube.title}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-[100%] h-[700px] p-[20px_20px_40px_20px] max-md:p-[15px_15px_35px_15px] max-md:m-auto max-sm:pb-[15px]"
                  ></iframe>
                  <span className="text-[16px] text-[#d7000f] font-bold max-sm:text-[14px]">
                    VIDEO
                  </span>
                  <h2 className="text-white text-[24px] font-medium mb-[20px] max-md:truncate max-md:w-[90%] max-sm:text-[18px] max-sm:mb-[0px] max-sm:h-[50px] ">
                    {youtube.title}
                  </h2>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-scrollbar"></div>
        </div>
      </div>
    </div>
  );
}
