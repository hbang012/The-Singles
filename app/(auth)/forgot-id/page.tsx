'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/forgot-id', label: '아이디 찾기' },
  { href: '/forgot-password', label: '비밀번호 찾기' },
];

export default function ForgotID() {
  const pathname = usePathname();

  return (
    <main className="flex items-center justify-center pt-[200px] pb-[310px]">
      <div className="flex items-center justify-center flex-col">
        <h2 className="font-bold text-[26px]">계정찾기</h2>

        <ul className="flex gap-x-[10px] p-[30px] pb-0 text-center leading-[58px]">
          {links.map((link) => (
            <li
              key={link.href}
              className={`border-0 rounded-[8px] h-[60px] w-[200px] ${
                pathname === link.href ? 'bg-[#333]' : 'bg-[#bfbfbf]'
              }`}
            >
              <Link
                href={link.href}
                className={
                  pathname === link.href
                    ? 'text-white text-[20px]'
                    : ' text-[20px]'
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn mt-[40px] h-[100px] w-full text-[18px] rounded-[8px]"
        >
          일반회원으로 가입한 경우
        </button>
        <button
          type="button"
          className="btn mt-[10px] h-[100px] w-full text-[18px] rounded-[8px] leading-[25px]"
        >
          간편회원가입으로 가입한 경우 <br /> (이메일/SNS)
        </button>
      </div>
    </main>
  );
}
