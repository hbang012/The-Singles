export default function Horoscope() {
  return (
    <div className=" flex justify-center flex-col gap-[10px] text-center">
      <h2 className="text-[25px] text-[#d7000f] font-bold cursor-default">
        Horoscope
      </h2>
      <p className="text-[12px]">2025.05.26</p>
      <p className="text-black text-[14px] font-medium truncate w-[95%]">
        퍼즐 조각들이 하나둘 제자리를 찾아간다. 공동 프로젝트에 집중해볼 것.
        금융 앱으로 빈틈없는 지출 관리도 좋다. 완벽주의는 내려놓고,
        마인드풀니스를 실천할 것. 음식의 맛과 향에 집중하는 연습이 도움이 된다.
        타자의 본질은 이질성이고 갈등은 관계의 디폴트 값이니 두려워 말 것.
      </p>
      <span className="underline underline-offset-4 text-[#999]">+ more</span>
    </div>
  );
}
