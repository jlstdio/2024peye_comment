"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [commentsData, setCommentsData] = useState([]);

  // 로그인 상태 확인
  useEffect(() => {
    const isLoggedIn = getCookie('loggedIn');
    if (!isLoggedIn) {
      router.push('/manage');
    }
  }, []);

  // 댓글 데이터 가져오기
  useEffect(() => {
    fetch('/data/comments.json')
      .then(response => response.json())
      .then(data => setCommentsData(data));
  }, []);

  // 상태 토글 함수
  const toggleActiveStatus = async (index, currentStatus) => {
    const newStatus = !currentStatus;

    const response = await fetch('/api/comments/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index, active: newStatus }),
    });

    if (response.ok) {
      setCommentsData(prevData => 
        prevData.map(comment => 
          comment.index === index ? { ...comment, active: newStatus } : comment
        )
      );
    } else {
      alert('상태 업데이트에 실패했습니다.');
    }
  };

  // 로그아웃 함수
  const handleLogout = () => {
    setCookie('loggedIn', '', -1); // 쿠키 삭제
    router.push('/manage');
  };

  return (
    <div className="App" style={{textAlign:"center"}}>
        <h1>관리자 모드</h1>

        <table border="1px solid black" style={{margin: "0 auto"}}>
          <thead>
            <tr>
              <th>index</th>
              <th>content</th>
              <th>date</th>
              <th>active</th>
            </tr>
          </thead>
          <tbody>
            {
              commentsData.map((e, i) => (
                  <tr key={i}>
                    <td>{e.index}</td>
                    <td>{e.content}</td>
                    <td>{e.timestamp}</td>
                    <td>
                      <button 
                        onClick={() => toggleActiveStatus(e.index, e.active)}
                        style={{color: e.active ? "green" : "red"}}
                      >
                        {e.active ? "활성화됨" : "비활성화됨"}
                      </button>
                    </td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>

        <div style={{marginTop:"30px"}}></div>
        <Link href="/" >전체 페이지 가기</Link>
        <a onClick={handleLogout} style={{cursor: 'pointer', color: 'blue', marginLeft: '10px'}}>관리자 로그아웃</a>
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
