'use client';

import { useState } from 'react';
import SubPopup from '@/app/componets/common/SubPopup';

export default function Submail() {
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

    setShowPopup(true);
  };

  return (
    <div className=" flex items-center justify-between gap-[20%] h-[144px] w-full p-[21px_20px_25px]  bg-[#d7000f] max-sm:flex-col">
      <p className=" text-white text-[24px] font-bold mb-[10px] max-sm:text-[15px] max-sm:mb-[0px]">
        당신에게 필요한 소식들을 메일로 받아보세요
      </p>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex max-sm:justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소를 입력해주세요"
            className=" bg-[#F4F4F4] border-0 rounded-tl-[6px] rounded-bl-[6px] mb-[10px] w-[80%] h-[45px] text-[14px]  [text-indent:15px]"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className=" btn border-0 h-[45px] bg-[#333] rounded-tr-[6px] rounded-br-[6px] w-[70px] text-[15px]"
          >
            <p className="text-white">구독</p>
          </button>
        </form>
      </div>

      {showPopup && (
        <SubPopup message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}
