'use client';

import { createContext, useContext } from 'react';

// 2중객체
const defaultTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#ddd',
  },
};

function defaultFn() {
  console.log('컨텍스트 함수 실행');
}

const ThemeContext = createContext({
  defaultTheme: defaultTheme,
  defaultFn: defaultFn,
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContext.Provider value={{ defaultTheme, defaultFn }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
