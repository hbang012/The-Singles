import Image from 'next/image';

export default function Sns() {
  return (
    <div className=" flex justify-between gap-[50%] max-md:gap-[10%] max-sm:flex-col max-sm:justify-center">
      <h2 className="text-black text-[20px] font-bold max-md:text-[16px]">
        내 삶을 풍요롭게 해주는 <br />
        싱글즈 소셜 네트워크에서 소통해요.
      </h2>

      <ul className="flex gap-[15px] items-center cursor-pointer ">
        <li>
          <Image
            src="/images/Instagram2.svg"
            alt="인스타"
            width={62}
            height={62}
            className="w-[45px] h-[45px] flex-shrink-0 object-cover max-sm:w-[35px] max-sm:h-[35px]"
          />
        </li>
        <li>
          <Image
            src="/images/Youtube2.svg"
            alt="유튜브"
            width={62}
            height={62}
            className="w-[45px] h-[45px] flex-shrink-0 object-cover max-sm:w-[35px] max-sm:h-[35px]"
          />
        </li>
        <li>
          <Image
            src="/images/x-circle.png"
            alt="트위터 X"
            width={25}
            height={25}
            className="w-[45px] h-[45px] flex-shrink-0 object-cover max-sm:w-[35px] max-sm:h-[35px]"
          />
        </li>
        <li className="mr-[10px] mt-[10px]">
          <Image
            src="/images/naverBlog-circle.png"
            alt="네이버 블로그"
            width={1546}
            height={1546}
            priority
            className="w-[45px] h-[45px] mb-[10px] flex-shrink-0 object-cover max-sm:w-[35px] max-sm:h-[35px]"
          />
        </li>
        <li>
          <Image
            src="/images/naverTV-circle.png"
            alt="네이버 티비"
            width={1546}
            height={1546}
            priority
            className="w-[45px] h-[45px] flex-shrink-0 object-cover max-sm:w-[35px] max-sm:h-[35px]"
          />
        </li>
      </ul>
    </div>
  );
}
