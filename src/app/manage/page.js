"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [password, setPassword] = useState('');

  useEffect(() => {
    // 페이지 로드 시 로그인 쿠키를 확인하여 이미 로그인되어 있는지 확인
    const isLoggedIn = getCookie('loggedIn');
    if (isLoggedIn) {
      router.push('/manage/edit');
    }
  }, []);

  function check() {
    const correctPassword = "peye5678!";

    if (password === correctPassword) {
      // 로그인 성공 시 쿠키를 설정하여 세션 유지
      setCookie('loggedIn', 'true', 30); // 30분 동안 유지
      router.push('/manage/edit'); 
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  }

  return (
    <div className="App" style={{textAlign:"center"}}>
        <h1>관리자 모드</h1>

        <h3>비밀번호를 입력하세요</h3>
        <input
          className='manager-pw'
          type='password'
          style={{width:"100px"}}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <button style={{width:"110px", marginTop:"10px"}} onClick={check}>입력</button> <br/>
        <div style={{marginTop:"30px"}}></div>
        <Link href="/" >전체 페이지 가기</Link>
    </div>
  );
}

// 쿠키 설정 함수
function setCookie(name, value, minutes) {
  const expires = new Date(Date.now() + minutes * 60000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// 쿠키 가져오기 함수
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
