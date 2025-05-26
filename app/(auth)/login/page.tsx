'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/forgot-id', label: '아이디 찾기' },
  { href: '/forgot-password', label: '비밀번호 찾기' },
];

export default function Login({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [input, setInput] = useState('');
  const pathname = usePathname();
  return (
    <main className="flex items-center justify-center pt-[200px] pb-[310px]">
      <div className="flex flex-col items-center w-full max-w-[400px]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="아이디 또는 이메일"
          className="bg-[#F4F4F4] border-0 rounded-[10px] mb-[10px] w-[100%] h-[60px] text-[20px]"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="비밀번호"
          className="bg-[#F4F4F4] border-0 rounded-[10px] mb-[10px] w-[100%] h-[60px] text-[20px]"
        />
        <button
          type="button"
          className="btn border-0 h-[60px] bg-[#333] rounded-[8px]  w-full text-[20px]"
        >
          <p className="text-white">로그인</p>
        </button>
        <ul className="flex gap-x-[10px] p-[30px] pb-0">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? 'text-point1' : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn border-0 rounded-[8px] w-[300px] h-[50px] bg-[#43c63c] mt-[10px]"
        >
          <p className="text-white">네이버 계정으로 로그인</p>
        </button>
        <button
          type="button"
          className="btn border-0 w-[300px] h-[50px] rounded-[8px] bg-[#fee500] mt-[10px]"
        >
          <Image
            src="/icons/kakao.svg"
            alt="kakao"
            width={20}
            height={20}
            className="mr-[10px]"
          />
          <p className="text-black">카카오로 시작하기</p>
        </button>
        {children}
        <h2 className="text-[15px] mt-[50px] mb-[10px]">
          싱글즈 회원가입하고 내 일상의 솔루션을 찾아보세요
        </h2>
        <button
          type="button"
          className="btn w-[400px] h-[60px] border-[1px] rounded-[8px] text-[20px] font-bold"
        >
          회원가입
        </button>
      </div>
    </main>
  );
}
