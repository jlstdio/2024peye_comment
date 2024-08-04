"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();
  const [status, setStatus] = useState('');

  useEffect(() => {

    if (!router.asPath.includes('?')) {
      return;
    }

    const params = new URLSearchParams(router.asPath.split('?')[1]);
    const statusParam = params.get('status');
    if (statusParam) {
      setStatus(statusParam);
    }
  }, [router]);

  return (
    <div className="add-info">

        { status }
        <h1>의견 전송 완료!</h1>

        <h3>적어주신 글이 곧 WALL에 올라올 거에요!</h3>

        <Link href="/view"><button>전체의견보기</button></Link>
    </div>
  );
}
