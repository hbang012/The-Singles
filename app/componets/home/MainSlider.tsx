'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import styles from './MainSlider.module.css';

export type Article = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

export default function MainSlider({ articles }: { articles: Article[] }) {
  // console.log(articles, '슬라이더 컴포넌트로 들어오나?');
  return (
    <div className={styles.slider}>
      <Swiper
        className="swiper-wrapper"
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 2800, disableOnInteraction: false }}
        loop={true}
      >
        {articles.length > 0 &&
          articles?.map((article) => (
            <SwiperSlide key={article.id} className="swiper-slide">
              <div className="flex max-md:flex-col ">
                <div className="h-[640px] w-full bg-[#ddd]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={540}
                    height={675}
                    priority
                    className="w-full h-full object-cover "
                  />
                </div>

                <div className="bg-[#333] w-full max-w-[35%] max-md:h-[100%] max-md:w-full max-md:max-w-[100%]">
                  <div className="flex flex-col justify-center items-start h-[640px] pr-[40px] pl-[40px] text-white max-md:p-[30px] max-md:pb-[1px] max-md:h-[210px]">
                    <h2 className="font-bold text-[48px] w-[90%] truncate max-md:text-[30px]">
                      {article.title}
                    </h2>
                    <p className="font-medium text-[20px] truncate mt-[30px] whitespace-normal max-md:text-[16px] max-md:mt-[18px]">
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
