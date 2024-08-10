"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();
  const [status, setStatus] = useState('');

  useEffect(() => {
    // window 객체가 있는지 확인하여 클라이언트 사이드에서만 코드가 실행되도록 합니다.
    if (typeof window !== 'undefined' && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const statusParam = params.get('status');
      if (statusParam) {
        setStatus(statusParam);
      }
    }
  }, []);

  return (
    <div className="add-info">
        <h1>의견 전송 완료!</h1>
        <h3>적어주신 글이 곧 WALL에 올라올 거에요!</h3>
        <Link href="/view"><button>전체의견보기</button></Link>
    </div>
  );
}
