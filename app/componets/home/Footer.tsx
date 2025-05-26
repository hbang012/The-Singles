import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#333] max-w-full mx-auto p-[93px_0_96px_0] ">
      <div className="p-[0_20px] flex items-center justify-around max-md:flex-wrap">
        <div className="flex flex-col">
          <Image
            src="/images/singles-logo2.png"
            alt="싱글스"
            width={220}
            height={66}
            priority={true}
            className="max-md:mb-[50px] max-md:w-[100px] max-md:h-[30px]"
          />

          <div className="flex gap-[20px] justify-center mt-[30px] max-md:hidden cursor-pointer">
            <Image
              src="/icons/Instagram.svg"
              alt="인스타"
              width={62}
              height={62}
              priority={true}
              className="w-[25px] h-[25px]"
            />
            <Image
              src="/icons/Youtube.svg"
              alt="유튜브"
              width={62}
              height={62}
              priority={true}
              className="w-[25px] h-[25px]"
            />
            <Image
              src="/icons/x-circle.png"
              alt="트위터 X"
              width={50}
              height={50}
              priority={true}
              className="w-[25px] h-[25px]"
            />
            <Image
              src="/icons/naverBlog.png"
              alt="네이버 블로그"
              width={222}
              height={206}
              priority={true}
              className="w-[25px] h-[25px]"
            />
            <Image
              src="/icons/naverTV.png"
              alt="네이버 티비"
              width={222}
              height={206}
              priority={true}
              className="w-[20px] h-[22px]"
            />
          </div>
        </div>

        <div>
          <h2 className="text-[18px] mb-[20px] font-bold text-white max-md:text-[12px] cursor-default">
            (주)더북컴퍼니
          </h2>
          <p className="text-[13px] text-white leading-[25px] max-md:text-[11px]">
            주소: (06135) 서울특별시 강남구 봉은사로 226 (역삼동, 더북컴퍼니)
            <br className=" max-sm:hidden" />
            대표이사: 이소영 <span className="m-[0_5px]">|</span>사업자등록번호:
            211-87-45869<span className="m-[0_5px]">|</span>통신판매업신고번호:
            제 2017-서울강남-03220 <br className="max-sm:hidden" />
            대표번호: 02-3458-7100<span className="m-[0_5px]">|</span>팩스:
            02-3458-7119
            <span className="m-[0_5px]">|</span>사업자등록정보 확인{' '}
            <br className="max-sm:hidden" />
            호스팅 서비스: (주)가비아 <br className="max-sm:hidden" />ⓒ 2024 THE
            BOOK COMPANY. ALL RIGHTS RESERVED.
          </p>
          <div className="mt-[20px] text-white text-[16px] font-bold max-md:text-[12px]">
            <p className="cursor-pointer">
              매체소개
              <span className="m-[0_8px] font-normal">|</span>
              이용약관
              <span className="m-[0_8px] font-normal">|</span>
              개인정보처리방침
              <span className="m-[0_8px] font-normal">|</span>
              이메일무단수집거부
            </p>
          </div>
          <div className=" text-white text-[16px] font-bold max-md:text-[12px]">
            <p className="cursor-pointer">
              공지사항
              <span className="m-[0_8px] font-normal">|</span>
              광고 편집 문의
              <span className="m-[0_8px] font-normal">|</span>
              문의하기
              <span className="m-[0_8px] font-normal">|</span>
              언론윤리강령
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
