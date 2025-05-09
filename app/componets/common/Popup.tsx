interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <main className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#fff] w-[290px] h-[191px] shadow-x1/20">
        <p className="text-lg">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="btn rounded-[6px] font-bold"
        >
          닫기
        </button>
      </div>
    </main>
  );
};

export default Popup;
