'use client';

import Image from 'next/image';
import Search from '@/app/componets/home/Header/Search';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SubPopup from '@/app/componets/common/SubPopup';
import Link from 'next/link';

export default function Menu({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    adProposal: false,
    adInquiry: false,
  });

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const [email, setEmail] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;

  const handleSubmit = () => {
    if (!emailRegex.test(email)) {
      setPopupMessage('이메일 형식을 정확히 입력해 주세요.');
    } else {
      setPopupMessage('구독레터 신청이 완료되었습니다.');
    }

    setShowPopup(true); // 팝업 활성화
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <main className="fixed top-0 left-0 w-[100%] h-[100%] bg-white z-50 ">
      <div className=" max-sm:hidden flex flex-col items-start p-[25px_95px_200px_90px] max-md:overflow-auto max-md:h-full">
        <div className="mx-auto max-w-[950px] flex justify-between items-center w-full">
          <Link href="/">
            <Image
              src="/icons/singles-logo.png"
              alt="싱글스"
              width={275}
              height={83}
              priority={true}
              className="w-[180]"
              onClick={onClose}
            />
          </Link>
          <div className="flex items-center">
            <div className="flex gap-6">
              <p
                className="cursor-pointer"
                onClick={() => router.push('/login')}
              >
                Login
              </p>
              <span>|</span>
              <p
                className="cursor-pointer"
                onClick={() => router.push('/login')}
              >
                Join
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsSearch(true)}
              className="ml-[10px]"
            >
              <Image
                src="/icons/magnifying-glass.png"
                alt="검색"
                width={40}
                height={40}
              />
            </button>
            {isSearch && <Search onClose={() => setIsSearch(false)} />}
          </div>
        </div>
        <div className="relative  max-w-[950px] mx-auto flex justify-between w-[100%] pt-[125px]">
          <button onClick={onClose} className="absolute top-0 left-0">
            <Image src="/icons/close.svg" alt="닫기" width={40} height={40} />
          </button>

          <ul className="grid grid-cols-2 grid-rows-6 gap-[20px] text-black text-[30px] font-bold  max-md:flex max-md:flex-col ">
            <li className="w-[270px] mb-[35px] hover:text-[#d7000f]">
              <Link
                href={`/category/1`}
                className="text-black"
                onClick={onClose}
              >
                STYLE
              </Link>
            </li>
            <li className="w-[270px] mb-[35px] hover:text-[#d7000f]">
              <Link
                href={`/category/2`}
                className="text-black "
                onClick={onClose}
              >
                BEAUTY
              </Link>
            </li>
            <li className="w-[270px] mb-[35px] hover:text-[#d7000f]">
              <Link
                href={`/category/4`}
                className="text-black"
                onClick={onClose}
              >
                CELEB
              </Link>
            </li>
            <li className="w-[270px] mb-[35px] hover:text-[#d7000f]">
              <Link
                href={`/category/3`}
                className="text-black"
                onClick={onClose}
              >
                LIFESTYLE
              </Link>
            </li>
            <li className="w-[270px] mb-[35px] hover:text-[#d7000f]">
              <Link
                href={`/category/6`}
                className="text-black"
                onClick={onClose}
              >
                LOVE
              </Link>
            </li>
            <li className="w-[270px] mb-[35px] hover:text-[#d7000f]">
              <Link
                href={`/category/5`}
                className="text-black"
                onClick={onClose}
              >
                VIDEO
              </Link>
            </li>
            <li className="w-[270px] mb-[35px] hover:text-[#d7000f]">
              <Link
                href={`/research?subcategory=canDo`}
                className="text-black"
                onClick={onClose}
              >
                RESEARCH
              </Link>
            </li>
            <li
              className="w-[270px] mb-[35px] hover:text-[#d7000f] cursor-pointer"
              onClick={onClose}
            >
              COMMUNITY
            </li>
            <li
              className="w-[270px] mb-[35px] hover:text-[#d7000f] cursor-pointer"
              onClick={onClose}
            >
              EVENT
            </li>
            <li
              className="w-[270px] mb-[35px] hover:text-[#d7000f] cursor-pointer"
              onClick={onClose}
            >
              HOROSCOPE
            </li>

            <ul className="flex gap-[15px] w-full items-center cursor-pointer">
              <li>
                <Image
                  src="/icons/Instagram2.svg"
                  alt="인스타"
                  width={62}
                  height={62}
                  className="w-[60px] h-[60px]"
                />
              </li>
              <li>
                <Image
                  src="/icons/Youtube2.svg"
                  alt="유튜브"
                  width={62}
                  height={62}
                  className="w-[70px] h-[70px] "
                />
              </li>
              <li>
                <Image
                  src="/icons/x2.jpg"
                  alt="트위터 X"
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px]"
                />
              </li>
              <li className="mr-[10px] mt-[10px]">
                <Image
                  src="/icons/naverBlog2.png"
                  alt="네이버 블로그"
                  width={222}
                  height={206}
                  priority={true}
                  className="w-[35px] h-[35px]"
                />
              </li>
              <li>
                <Image
                  src="/icons/naverTV2.png"
                  alt="네이버 티비"
                  width={222}
                  height={206}
                  priority={true}
                  className="w-[30px] h-[35px] mt-[5px]"
                />
              </li>
            </ul>
          </ul>

          <div>
            <div className="cursor-pointer">
              <Image
                src="/icons/lee-post.jpg"
                alt="싱글즈 잡지"
                width={1352}
                height={1754}
                priority={true}
                className="w-[152px] h-[182px]"
              />
            </div>
            <ul className="mt-8 text-[22px] font-bold text-black">
              <li
                onClick={() => toggleMenu('adProposal')}
                className="cursor-pointer mt-[30px] hover:text-[#d7000f]"
              >
                광고 제휴 제안서
                <Image
                  src="/icons/left-arrow.png"
                  alt=" "
                  width={12}
                  height={20}
                  className={`ml-[10px] mt-[7px] transition-transform duration-300 ${
                    openMenus.adProposal ? 'rotate-90' : ''
                  }`}
                />
                {openMenus.adProposal && (
                  <ul>
                    <li className="font-normal mt-[22px] cursor-pointer">
                      싱글즈 미디어킷
                    </li>
                  </ul>
                )}
              </li>
              <li
                onClick={() => toggleMenu('adInquiry')}
                className="cursor-pointer mt-[30px] hover:text-[#d7000f]"
              >
                광고 제휴 문의
                <Image
                  src="/icons/left-arrow.png"
                  alt=" "
                  width={12}
                  height={20}
                  className={`ml-[28px] mt-[7px] transition-transform duration-300 ${
                    openMenus.adInquiry ? 'rotate-90' : ''
                  }`}
                />
                {openMenus.adInquiry && (
                  <ul>
                    <li className="font-normal  mt-[30px] cursor-pointer">
                      싱글즈 문의하기
                    </li>
                  </ul>
                )}
              </li>
              <li className=" mt-[30px] hover:text-[#d7000f] cursor-pointer">
                정기 구독
              </li>
              <li className=" mt-[30px] hover:text-[#d7000f] cursor-pointer">
                1:1 문의하기
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 모바일 */}
      <div className="max-sm:overflow-auto max-sm:h-full">
        <div className="max-sm:w-full max-sm:border-b-1 max-sm:border-[#ccc] max-sm:p-[9px_20px_9px_20px]">
          <div className="max-sm:mt-[5px] max-sm:flex max-sm:justify-between max-sm:w-full">
            <button onClick={onClose} className=" ">
              <Image
                src="/icons/close.svg"
                alt="닫기"
                width={14}
                height={14}
                className="w-[25px] h-[25px]"
              />
            </button>
            <Link href="/">
              <Image
                src="/icons/singles-logo.png"
                alt="싱글스"
                width={550}
                height={166}
                className="w-[95px] h-[30px]"
                onClick={onClose}
              />
            </Link>
            <button
              type="button"
              onClick={() => setIsSearch(true)}
              className=""
            >
              <Image
                src="/icons/magnifying-glass.png"
                alt="검색"
                width={512}
                height={512}
                className="h-[25px] w-[25px]"
              />
            </button>
            {isSearch && <Search onClose={() => setIsSearch(false)} />}
          </div>
        </div>
        <div className="max-sm:mt-[28px] max-sm:flex max-sm:p-[0_15px_0_15px]">
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="max-sm:btn max-sm:border-0 max-sm:p-[13px_0_14px] max-sm:bg-[#333] max-sm:rounded-[8px] max-sm:w-full max-sm:h-[45px] max-sm:text-[14px] max-sm:mr-[10px] "
          >
            <p className="text-white max-sm:leading-[10px]">LOGIN</p>
          </button>
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="max-sm:btn max-sm:border-1 max-sm:border-[#ccc] max-sm:p-[13px_0_14px] max-sm:bg-[#fff] max-sm:rounded-[8px] max-sm:w-full max-sm:h-[45px] max-sm:text-[14px]"
          >
            <p className="text-black max-sm:leading-[10px]">JOIN</p>
          </button>
        </div>
        <div className="max-sm:border-b-1 max-sm:border-[#ddd]">
          <p className="max-sm:text-[#333] max-sm:text-[14px] max-sm:mt-[15px] max-sm:ml-[15px] max-sm:mb-[15px]">
            싱글즈 로그인하고
            <strong className="max-sm:font-bold max-sm:ml-[5px]">
              회원 전용 혜택
            </strong>
            받기!
          </p>
        </div>

        <div className="max-sm:flex max-sm:flex-col max-sm:px-[15px] max-sm:py-[20px]">
          <ul className="text-black max-sm:text-[18px] max-sm:font-bold max-sm:flex max-sm:flex-col max-sm:border-b-1 max-sm:border-[#ccc]">
            <li
              className="max-sm:mb-[30px] max-sm:mt-[10px] hover:text-[#d7000f] max-sm:flex max-sm:justify-between max-sm:items-center cursor-pointer"
              onClick={onClose}
            >
              <Link href={`/category/1`} className="text-black">
                <span>
                  STYLE
                  <span className="max-sm:text-[#a5a5a5] max-sm:text-[12px] max-sm:font-normal max-sm:ml-[10px]">
                    스타일
                  </span>
                </span>
              </Link>
              <Image
                src="/icons/left-arrow.png"
                alt=""
                width={12}
                height={20}
                className="w-[10px] h-[18px]"
              />
            </li>
            <li
              className="max-sm:mb-[30px] hover:text-[#d7000f] max-sm:flex max-sm:justify-between max-sm:items-center cursor-pointer"
              onClick={onClose}
            >
              <Link href={`/category/2`} className="text-black">
                <span>
                  BEAUTY
                  <span className="max-sm:text-[#a5a5a5] max-sm:text-[12px] max-sm:font-normal max-sm:ml-[10px]">
                    뷰티·메이크업
                  </span>
                </span>
              </Link>
              <Image
                src="/icons/left-arrow.png"
                alt=""
                width={12}
                height={20}
                className="w-[10px] h-[18px]"
              />
            </li>
            <li
              className="max-sm:mb-[30px] hover:text-[#d7000f] max-sm:flex max-sm:justify-between max-sm:items-center cursor-pointer"
              onClick={onClose}
            >
              <Link href={`/category/4`} className="text-black">
                <span>
                  CELEB
                  <span className="max-sm:text-[#a5a5a5] max-sm:text-[12px] max-sm:font-normal max-sm:ml-[10px]">
                    샐럽
                  </span>
                </span>
              </Link>
              <Image
                src="/icons/left-arrow.png"
                alt=""
                width={12}
                height={20}
                className="w-[10px] h-[18px]"
              />
            </li>
            <li
              className="max-sm:mb-[30px] hover:text-[#d7000f] max-sm:flex max-sm:justify-between max-sm:items-center cursor-pointer"
              onClick={onClose}
            >
              <Link href={`/category/3`} className="text-black">
                <span>
                  LIFESTYLE
                  <span className="max-sm:text-[#a5a5a5] max-sm:text-[12px] max-sm:font-normal max-sm:ml-[10px]">
                    라이프스타일
                  </span>
                </span>
              </Link>
              <Image
                src="/icons/left-arrow.png"
                alt=""
                width={12}
                height={20}
                className="w-[10px] h-[18px]"
              />
            </li>
            <li
              className="max-sm:mb-[30px] hover:text-[#d7000f] max-sm:flex max-sm:justify-between max-sm:items-center cursor-pointer"
              onClick={onClose}
            >
              <Link href={`/category/6`} className="text-black">
                <span>
                  LOVE
                  <span className="max-sm:text-[#a5a5a5] max-sm:text-[12px] max-sm:font-normal max-sm:ml-[10px]">
                    러브
                  </span>
                </span>
              </Link>
              <Image
                src="/icons/left-arrow.png"
                alt=""
                width={12}
                height={20}
                className="w-[10px] h-[18px]"
              />
            </li>
            <li
              className="max-sm:mb-[30px] hover:text-[#d7000f] max-sm:flex max-sm:justify-between max-sm:items-center cursor-pointer"
              onClick={onClose}
            >
              <Link href={`/category/5`} className="text-black">
                <span>
                  VIDEO
                  <span className="max-sm:text-[#a5a5a5] max-sm:text-[12px] max-sm:font-normal max-sm:ml-[10px] max-sm:mb-[30px]">
                    비디오
                  </span>
                </span>
              </Link>
              <Image
                src="/icons/left-arrow.png"
                alt=""
                width={12}
                height={20}
                className="w-[10px] h-[18px]"
              />
            </li>
          </ul>
        </div>

        <div className="max-sm:px-[15px] max-sm:py-[20px]">
          <ul className="text-black max-sm:text-[18px] max-sm:font-bold max-sm:flex max-sm:flex-col max-sm:border-b-1 max-sm:border-[#ccc]">
            <li
              className="max-sm:mb-[30px] hover:text-[#d7000f] max-sm:flex max-sm:justify-between max-sm:items-center cursor-pointer"
              onClick={onClose}
            >
              <Link href={`/research?subcategory=canDo`}>
                <span className="text-black">
                  RESEARCH
                  <span className="max-sm:text-[#a5a5a5] max-sm:text-[12px] max-sm:font-normal max-sm:ml-[10px] max-sm:mb-[30px] cursor-pointer">
                    리서치
                  </span>
                </span>
              </Link>
              <Image
                src="/icons/left-arrow.png"
                alt=""
                width={12}
                height={20}
                className="w-[10px] h-[18px]"
              />
            </li>
            <li
              className="max-sm:mb-[30px] hover:text-[#d7000f] max-sm:flex max-sm:justify-between max-sm:items-center cursor-pointer"
              onClick={onClose}
            >
              <span>
                COMMUNITY
                <span className="max-sm:text-[#a5a5a5] max-sm:text-[12px] max-sm:font-normal max-sm:ml-[10px] max-sm:mb-[30px] cursor-pointer">
                  커뮤니티
                </span>
              </span>
              <Image
                src="/icons/left-arrow.png"
                alt=""
                width={12}
                height={20}
                className="w-[10px] h-[18px]"
              />
            </li>
            <li
              className=" max-sm:mb-[40px] hover:text-[#d7000f] max-sm:flex max-sm:justify-between max-sm:items-center cursor-pointer"
              onClick={onClose}
            >
              <span>
                HOROSCOPE
                <span className="max-sm:text-[#a5a5a5] max-sm:text-[12px] max-sm:font-normal max-sm:ml-[10px] max-sm:mb-[30px] cursor-pointer">
                  오늘의 운세
                </span>
              </span>
              <Image
                src="/icons/left-arrow.png"
                alt=""
                width={12}
                height={20}
                className="w-[10px] h-[18px]"
              />
            </li>
          </ul>
        </div>

        <div className="max-sm:px-[15px] max-sm:py-[8px]">
          <div
            className="max-sm:mt-[10px] max-sm:mb-[30px] max-sm:text-[18px] max-sm:font-bold max-sm:text-black hover:text-[#d7000f] max-sm:flex max-sm:justify-between max-sm:items-center cursor-pointer"
            onClick={onClose}
          >
            <span className="cursor-pointer">
              EVENT
              <span className="max-sm:text-[#a5a5a5] max-sm:text-[12px] max-sm:font-normal max-sm:ml-[10px] max-sm:mb-[30px] cursor-pointer">
                이벤트
              </span>
            </span>
            <Image
              src="/icons/left-arrow.png"
              alt=""
              width={12}
              height={20}
              className="w-[10px] h-[18px]"
            />
          </div>
        </div>

        {/* sns */}
        <div className="max-sm:flex max-sm:justify-center max-sm:items-center max-sm:m-auto max-sm:px-[15px] max-sm:py-[20px] max-sm:border-t-1  max-sm:border-b-1 max-sm:border-[#ccc]">
          <ul className="max-sm:flex max-sm:items-center max-sm:gap-[20px] cursor-pointer">
            <li>
              <Image
                src="/icons/Instagram2.svg"
                alt="인스타"
                width={62}
                height={62}
                className="w-[40px] h-[40px]"
              />
            </li>
            <li>
              <Image
                src="/icons/Youtube2.svg"
                alt="유튜브"
                width={62}
                height={62}
                className="w-[46px] h-[43px] "
              />
            </li>
            <li>
              <Image
                src="/icons/x2.jpg"
                alt="트위터 X"
                width={50}
                height={50}
                className="w-[35px] h-[35px]"
              />
            </li>
            <li className=" max-sm:ml-[8px]  max-sm:mt-[5px] ">
              <Image
                src="/icons/naverBlog2.png"
                alt="네이버 블로그"
                width={222}
                height={206}
                priority={true}
                className="w-[25px] h-[25px]"
              />
            </li>
            <li className="max-sm:ml-[20px]">
              <Image
                src="/icons/naverTV2.png"
                alt="네이버 티비"
                width={222}
                height={206}
                priority={true}
                className="w-[20px] h-[22px] mt-[5px]"
              />
            </li>
          </ul>
        </div>

        {/* 문의 */}
        <div className="max-sm:px-[15px] max-sm:py-[20px]">
          <ul className="max-sm:mt-8 max-sm:text-[18px] max-sm:font-bold max-sm:text-black cursor-pointer">
            <li
              onClick={() => toggleMenu('adProposal')}
              className="cursor-pointer max-sm:flex max-sm:justify-between max-sm:mt-[30px] max-sm:hover:text-[#d7000f]"
            >
              광고 제휴 제안서
              <Image
                src="/icons/left-arrow.png"
                alt=" "
                width={12}
                height={20}
                className={`w-[12px] h-[20px] max-sm:ml-[10px] max-sm:mt-[7px] max-sm:transition-transform duration-300 ${
                  openMenus.adProposal ? '-rotate-90' : ''
                }`}
              />
            </li>
            {openMenus.adProposal && (
              <ul className="max-sm:flex">
                <li className="max-sm:items-start max-sm:text-[16px] max-sm:font-medium max-sm:mt-[13px] max-sm:text-[#707070]">
                  싱글즈 미디어킷
                </li>
              </ul>
            )}
            <li
              onClick={() => toggleMenu('adInquiry')}
              className="cursor-pointer max-sm:flex max-sm:justify-between  max-sm:mt-[30px] hover:text-[#d7000f]"
            >
              광고 제휴 문의
              <Image
                src="/icons/left-arrow.png"
                alt=" "
                width={12}
                height={20}
                className={`w-[12px] h-[20px] max-sm:ml-[28px] max-sm:mt-[7px] transition-transform duration-300 ${
                  openMenus.adInquiry ? '-rotate-90' : ''
                }`}
              />
            </li>
            {openMenus.adInquiry && (
              <ul>
                <li className="max-sm:text-[16px] max-sm:font-medium max-sm:mt-[13px] max-sm:text-[#707070]">
                  싱글즈 문의하기
                </li>
              </ul>
            )}
            <li className=" max-sm:mt-[30px] max-sm:hover:text-[#d7000f] cursor-pointer">
              정기 구독
            </li>
            <li className=" max-sm:mt-[30px] max-sm:hover:text-[#d7000f] cursor-pointer">
              1:1 문의하기
            </li>
          </ul>
        </div>

        {/* 메일 수신 */}
        <div className=" max-sm:h-[144px] max-sm:w-full max-sm:p-[21px_20px_25px] max-sm:bg-[#d7000f]">
          <p className="max-sm:text-white max-sm:text-[14px] max-sm:mb-[20px]">
            당신에게 필요한 소식들을 메일로 받아보세요
          </p>
          <div className="">
            <form onSubmit={handleSubmit} className="max-sm:flex">
              <input
                type="email"
                value={email}
                onKeyDown={handleKeyPress}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력해주세요"
                className="max-sm:bg-[#F4F4F4] max-sm:border-0 max-sm:rounded-[6px] max-sm:mb-[10px] max-sm:w-[80%] max-sm:h-[45px] max-sm:text-[14px] max-sm:mr-[10px] max-sm:[text-indent:15px]"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="max-sm:btn max-sm:border-0 max-sm:h-[45px] max-sm:bg-[#333] max-sm:rounded-[6px] max-sm:w-[70px] max-sm:text-[15px]"
              >
                <p className="text-white">구독</p>
              </button>
            </form>
          </div>

          {showPopup && (
            <SubPopup
              message={popupMessage}
              onClose={() => setShowPopup(false)}
            />
          )}
        </div>
      </div>
    </main>
  );
}
