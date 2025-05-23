import Image from 'next/image';
import { useState } from 'react';
import Menu from '@/app/componets/home/Header/Menu';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Search({ onClose }: { onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenu, setMenu] = useState(false);
  const router = useRouter();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <main className="fixed top-0 left-0 w-full h-full p-[32px] bg-white flex justify-between z-50 max-md:flex-col max-md:p-[20px] max-md:pb-[900px]">
      <div className="flex-shrink-0 max-md:ml-[50%] max-md:flex-none  max-sm:ml-[10%]">
        <button type="button" onClick={() => setMenu(true)}>
          <Image
            src="/icons/hamburger.svg"
            alt="탭"
            width={20}
            height={20}
            className="ml-[60px] mt-[30px] max-md:hidden"
          />
        </button>
        <Link href="/">
          <Image
            src="/icons/singles-logo.png"
            alt="싱글스"
            width={550}
            height={166}
            priority
            onClick={onClose}
            className="w-[180px] h-[55px] ml-[20px] mt-[20px] max-md:w-[100px] max-md:mt-0 max-md:h-[30px] cursor-pointer"
          />
        </Link>
      </div>
      {isMenu && <Menu onClose={() => setMenu(false)} />}
      <div className="bg-white p-4 w-3/4 relative max-md:ml-[20%] max-sm:ml-[5%]  max-sm:w-[100%]">
        <input
          type="text"
          placeholder="검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-[54px] border-0 p-[15px_60px_15px_30px] bg-[#f3f3f3] rounded-[35px]"
        />
        <Image
          src="/icons/magnifying-glass.png"
          alt="검색"
          width={30}
          height={30}
          className="absolute top-[3%] right-[40px] max-md:top-[28%] cursor-pointer"
          onClick={() => {
            if (searchQuery.trim()) {
              router.push(`/search?keyword=${encodeURIComponent(searchQuery)}`);
            }
          }}
        />
      </div>
      <div>
        <button
          onClick={onClose}
          className="absolute top-[6.5%] right-[2.5%] max-md:top-[2%]"
        >
          <Image src="/icons/close.svg" alt="닫기" width={30} height={30} />
        </button>
      </div>
    </main>
  );
}
