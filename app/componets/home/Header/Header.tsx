'use client';

import { useState } from 'react';
import Image from 'next/image';
import Search from '@/app/componets/home/Header/Search';
import Menu from '@/app/componets/home/Header/Menu';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isSearch, setSearch] = useState(false);
  const [isMenu, setMenu] = useState(false);
  const router = useRouter();

  return (
    <header className='p-[25px] bg-white w-full h-full border-[#bfbfbf] border-b-[1px] max-sm:p-[10px_0_0_0] max-sm:border-0'>
      <div className='flex justify-between max-sm:justify-center max-sm:space-x-[40%] max-sm:pl-[70px] max-sm:pr-[70px]'>
        <div className='flex flex-shrink-0 max-sm:items-center'>
          <button onClick={() => setMenu(true)}>
            <Image
              src='/images/hamburger.svg'
              alt='탭'
              width={20}
              height={20}
              className='mr-[22px] w-auto h-auto max-sm:h-[17px] max-sm:w-[17px] max-sm:mr-[0px] max-sm:ml-[20px]'
            />
          </button>
          <Image
            src='/images/singles-logo.png'
            alt='싱글스'
            width={275}
            height={83}
            priority
            className='mr-[20px] w-[180px] max-md:my-auto max-sm:h-[30px] max-sm:w-[100px] max-sm:ml-[80%] max-sm:pl-[10%] max-sm:mr-[0px]'
          />
          {isMenu && <Menu onClose={() => setMenu(false)} />}
          <ul className='text-[18px] font-bold text-black flex items-center gap-[40px] max-md:text-[12px] max-md:items-start max-md:flex-col max-md:gap-[1px] max-sm:hidden '>
            <li>
              <p>STYLE</p>
            </li>
            <li>
              <p>BEAUTY</p>
            </li>
            <li>
              <p>LIFESTYLE</p>
            </li>
            <li>
              <p>CELEB</p>
            </li>
            <li>
              <p>VIDEO</p>
            </li>
            <li>
              <p>LOVE&SEX</p>
            </li>
          </ul>
        </div>

        <ul className='flex items-center gap-[20px] max-sm:gap-0 max-sm:justify-center max-sm:items-center'>
          <li
            onClick={() => router.push('/login')}
            className='text-black cursor-pointer max-sm:hidden'
          >
            <p>Login</p>
          </li>
          <span className='text-[18px]  max-sm:hidden'>|</span>
          <li
            onClick={() => router.push('/login')}
            className='text-black cursor-pointer max-sm:hidden'
          >
            <p>Join</p>
          </li>
          <span className='text-[18px] max-sm:hidden'>|</span>
          <li className='bg-black p-[5px_10px] w-[105px] h-[30px] max-sm:ml-[10%] max-sm:w-[110px] max-sm:p-[5px_5px]'>
            <p className='text-white text-[13px] max-sm:text-[11px] max-sm:leading-[20px] max-sm:ml-[8px] '>
              광고ㆍ편집 문의
            </p>
          </li>
          <li>
            <button type='button' onClick={() => setSearch(true)}>
              <Image
                src='/images/magnifying-glass.png'
                alt='검색'
                width={30}
                height={30}
                className='max-sm:hidden'
              />
            </button>

            {isSearch && <Search onClose={() => setSearch(false)} />}
          </li>
        </ul>
      </div>

      <div className=' max-sm:border-[#a7a7a7] max-sm:border-t-[1px] max-sm:border-b-[1px] max-sm:p-[10px] max-sm:mt-[5px]'>
        <ul className='sm:hidden text-[13px] font-bold text-black max-sm:flex max-sm:flex-row max-sm:justify-center max-sm:text-[2.5vw] max-sm:max-text-[13px] max-sm:gap-[10px]'>
          <li>
            <p>STYLE</p>
          </li>
          <li>
            <p>BEAUTY</p>
          </li>
          <li>
            <p>LIFESTYLE</p>
          </li>
          <li>
            <p>CELEB</p>
          </li>
          <li>
            <p>VIDEO</p>
          </li>
          <li>
            <p>LOVE&SEX</p>
          </li>
        </ul>
      </div>
    </header>
  );
}
