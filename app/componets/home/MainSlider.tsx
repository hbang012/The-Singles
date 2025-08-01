'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import styles from './MainSlider.module.css';
import type { Article } from '@/app/_lib/types';
import { useRouter } from 'next/navigation';

export default function MainSlider({ data }: { data: Article[] }) {
  const articles = data ?? [];
  const router = useRouter();

  return (
    <div className={`cursor-pointer ${styles.slider}`}>
      <Swiper
        className="swiper-wrapper"
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        resizeObserver={false}
        autoplay={{ delay: 2800, disableOnInteraction: false }}
        loop={true}
      >
        {articles.length > 0 &&
          articles?.map((article) => (
            <SwiperSlide key={article.id} className="swiper-slide">
              <div className="flex max-md:flex-col ">
                <div className="h-[640px] w-full bg-[#ddd] max-sm:h-[375px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={540}
                    height={675}
                    priority={true}
                    className="w-full h-full object-cover "
                    onClick={() => router.push(`/articles/${article.id}`)}
                  />
                </div>

                <div
                  className="bg-[#333] w-full max-w-[35%] max-md:h-[100%] max-md:w-full max-md:max-w-[100%]"
                  onClick={() => router.push(`/articles/${article.id}`)}
                >
                  <div className="flex flex-col justify-center items-start h-[640px] pr-[40px] pl-[40px] text-white max-md:p-[30px] max-md:pb-[1px] max-md:h-[210px] max-sm:pt-[0px]">
                    <h2 className="font-bold text-[48px] w-[90%] truncate max-md:text-[30px]">
                      {article.title}
                    </h2>
                    <p className="font-medium text-[20px] truncate mt-[30px] whitespace-normal max-md:text-[16px] max-md:mt-[18px] max-sm:mt-[5px]">
                      {article.subtitle}
                    </p>

                    <div className="flex mt-[8%] max-md:hidden">
                      <span className="flex items-center justify-center bg-black w-[150px] h-[50px] ">
                        <p className="font-bold text-[16px]">VIEW MORE</p>
                      </span>
                      <span className="flex items-center justify-center bg-white w-[50px] h-[50px]">
                        <Image
                          src="/images/left-arrow.png"
                          alt="더보기"
                          width={12}
                          height={20}
                          priority={true}
                          className="flex-shrink-0 w-[10px] h-[17px]"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
