'use client';

import { useState } from 'react';

export default function ClientOne({ children }: { children: React.ReactNode }) {
  const [name, setNmae] = useState('panda');

  return (
    <div>
      <h2>ClentOne</h2>
      {children}
    </div>
  );
}
