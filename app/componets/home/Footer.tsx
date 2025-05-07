import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#333] max-w-full m-auto p-[93px_0_96px_0] ">
      <nav className="m-[0_75px] flex items-center justify-around max-md:flex-wrap">
        <div className="flex flex-col">
          <Image
            src="/images/singles-logo2.png"
            alt="싱글스"
            width={220}
            height={66}
            className="max-md:mb-[50px] max-md:w-[100px] max-md:h-[30px]"
          />

          <div className="flex gap-[20px] justify-center mt-[30px] max-md:hidden ">
            <Image
              src="/images/Instagram.svg"
              alt="인스타"
              width={25}
              height={25}
              style={{ width: 'auto', height: 'auto' }}
            />
            <Image
              src="/images/Youtube.svg"
              alt="유튜브"
              width={25}
              height={25}
              style={{ width: 'auto', height: 'auto' }}
            />
            <Image
              src="/images/x-circle25.png"
              alt="트위터 X"
              width={25}
              height={25}
              style={{ width: 'auto', height: 'auto' }}
            />
            <Image
              src="/images/naverBlog.png"
              alt="네이버 블로그"
              width={25}
              height={25}
              style={{ width: 'auto', height: 'auto' }}
            />
            <Image
              src="/images/naverTV.png"
              alt="네이버 티비"
              width={20}
              height={20}
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        </div>

        <div className="">
          <h2 className="text-[18px] mb-[20px] font-bold text-white max-md:text-[12px]">
            (주)더북컴퍼니
          </h2>
          <p className="text-[13px] text-white leading-[25px] max-md:text-[11px]">
            주소: (06135) 서울특별시 강남구 봉은사로 226 (역삼동, 더북컴퍼니)
            <br />
            대표이사: 이소영 <span className="m-[0_5px]">|</span>사업자등록번호:
            211-87-45869<span className="m-[0_5px]">|</span>통신판매업신고번호:
            제 2017-서울강남-03220 <br />
            대표번호: 02-3458-7100<span className="m-[0_5px]">|</span>팩스:
            02-3458-7119
            <span className="m-[0_5px]">|</span>사업자등록정보 확인 <br />
            호스팅 서비스: (주)가비아 <br />ⓒ 2024 THE BOOK COMPANY. ALL RIGHTS
            RESERVED.
          </p>
          <div className="mt-[20px] ">
            <p className="text-white text-[16px] font-bold max-md:text-[12px]">
              매체소개<span className="m-[0_8px]">|</span>이용약관
              <span className="m-[0_8px]">|</span>개인정보처리방침
              <span className="m-[0_8px]">|</span>이메일무단수집거부 <br />
              공지사항<span className="m-[0_8px]">|</span>광고 편집 문의
              <span className="m-[0_8px]">|</span>문의하기
              <span className="m-[0_8px]">|</span>언론윤리강령
            </p>
          </div>
        </div>
      </nav>
    </footer>
  );
}
