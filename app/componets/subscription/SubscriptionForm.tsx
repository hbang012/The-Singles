import { useState } from 'react';
import Popup from '@/app/componets/common/Popup';

export default function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setMessage('이메일 형식을 정확히 입력해 주세요');
    } else {
      setMessage('구독레터 신청이 완료되었습니다.');
    }

    setShowPopup(true); // 팝업 활성화
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소를 입력해주세요"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          구독
        </button>
      </form>

      {showPopup && (
        <Popup message={message} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}
