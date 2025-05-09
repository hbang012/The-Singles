'use client';

interface SubPopupProps {
  message: string;
  onClose: () => void;
}

const SubPopup: React.FC<SubPopupProps> = ({ message, onClose }) => {
  return (
    <main className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,.6)]">
      <div className="bg-[#fff] rounded-[6px] w-[290px] h-[191px] shadow-2xl">
        <p className="text-lg text-[14px] text-black font-bold flex items-center justify-center mt-[70px] mb-[45px]">
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="btn border-t-[#ccc] border-b-0 border-r-0 border-l-0 w-full h-[55px] text-[16px] font-bold hover:text-[#d7000f]"
        >
          확인
        </button>
      </div>
    </main>
  );
};

export default SubPopup;
