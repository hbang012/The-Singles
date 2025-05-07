import Image from 'next/image';

export default function Header() {
  return (
    <header className="p-[25px] bg-amber-200 w-full h-full max-sm:p-[10px_14px_0_6px] ">
      <div className="flex justify-between max-sm:justify-center max-sm:gap-[30px] max-sm:space-x-[45%] max-sm:mx-[100px]">
        <div className="flex flex-shrink-0">
          <Image
            src="/images/hamburger.svg"
            alt="탭"
            width={20}
            height={20}
            className="mr-[22px] w-auto h-auto max-sm:h-[17px] max-sm:w-[17px]  max-sm:my-[10px] max-sm:mr-[10%]"
          />
          <Image
            src="/images/singles-logo.png"
            alt="싱글스"
            width={180}
            height={55}
            className="mr-[20px] max-md:my-auto max-sm:h-[30px] max-sm:w-[100px] max-sm:ml-[20px]"
          />
          <ul className="text-[18px] font-bold text-black flex items-center gap-[40px] max-md:text-[12px] max-md:items-start max-md:flex-col max-md:gap-[1px] max-sm:hidden">
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

        <ul className="flex items-center gap-[20px] max-sm:gap-0">
          <li className="text-black max-sm:hidden">
            <p>Login</p>
          </li>
          <span className="text-[18px] max-sm:hidden">|</span>
          <li className="text-black max-sm:hidden">
            <p>Join</p>
          </li>
          <span className="text-[18px] max-sm:hidden">|</span>
          <li className="bg-black p-[5px_10px] w-[105px] h-[30px]">
            <p className="text-white text-[13px]">광고ㆍ편집 문의</p>
          </li>
          <li>
            <Image
              src="/images/magnifying-glass.png"
              alt="검색"
              width={30}
              height={30}
              className="max-sm:hidden"
            />
          </li>
        </ul>
      </div>

      <div className=" max-sm:border-[#a7a7a7] max-sm:border-t-[1px] max-sm:border-b-[1px] max-sm:p-[10px] max-sm:mt-[5px]">
        <ul className="sm:hidden text-[13px] font-bold text-black max-sm:flex max-sm:flex-row max-sm:justify-center max-sm:text-[2.5vw] max-sm:max-text-[13px] max-sm:gap-[10px]">
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
