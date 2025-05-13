import Image from 'next/image';

export default function Style() {
  return (
    <div className="p-[0_20px_0_20px]">
      <div className="flex flex-col mt-[35px] w-full">
        {''}
        <div className="flex justify-between items-center">
          <div className="w-full flex items-center justify-start">
            <span className="bg-black w-[28px] h-[56px] mr-[15px] max-md:w-[25px] max-md:h-[45px]"></span>
            <h2 className="text-black text-[60px] font-bold max-md:text-[45px]">
              Style
            </h2>
          </div>

          <p className="w-[200px] font-bold text-[20px] text-[#333] underline underline-[#333] underline-offset-4 ">
            + MORE
          </p>
        </div>

        {/* 박스 */}
        <div className="flex">
          <div className="bg-[#333] flex items-start justify-center flex-col w-[440px] h-[580px] pl-[20px] pr-[20px] overflow-hidden">
            <span className="text-[16px] text-[#d7000f] font-bold">ddddd</span>

            <h2 className="text-[48px] text-white font-bold truncate w-[90%] mb-[20px]">
              aaaaaaaaaaaaaaaaaaaaaaaa
            </h2>
            <p className=" text-[20px] text-white font-medium">
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </p>
          </div>

          <div className="w-[840px] h-[580px] mb-[20px]">
            <Image
              src="/images/cat.jpg"
              alt="링크"
              width={200}
              height={267}
              // priority
              className="h-[100%] w-[100%] object-cover mb-[20px] "
            />
          </div>
        </div>

        {/* 컨테이너 */}
        <div className="flex justify-center flex-wrap gap-[30px] mt-[30px] max-md:gap-[20px]">
          <div className="flex flex-col gap-[10px] w-[290px] max-md:w-[220px]">
            <Image
              src="/images/cat.jpg"
              alt="고양이"
              width={540}
              height={675}
              priority
              className="h-[470px] w-[100%] object-cover cursor-pointer mb-[20px] max-md:h-[220px] max-md:w-[220px]"
            />
            <strong className="w-[290px] text-[16px] text-[#d7000f] font-bold max-md:w-[220px]">
              서브 카테고리
            </strong>
            <h2 className="w-[290px] text-black text-[24px] font-medium max-md:text-[20px] max-md:w-[220px]">
              dddddddddd
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
