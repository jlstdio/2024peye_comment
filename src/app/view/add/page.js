"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from "next/link";

export default function Home() {

  const [inputValue, setInputValue] = useState('');
  const router = useRouter(); // useRouter 훅 초기화

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') return;

    const response = await fetch('/api/addComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: inputValue }),
    });

    if (response.ok) {
      // alert('의견이 성공적으로 전송되었습니다.');
      setInputValue('');
      router.push(`/view/add/add_info?status=성공`);
    } else {
      // alert('의견 전송에 실패했습니다.');
      router.push(`/view/add/add_info?status=실패`);
    }
  };

  return (
    <div className="add-form" >
        <form onSubmit={handleSubmit}>
            <h1 className='basic-font'>SNS의 피로함을<br/>느끼는 당신,<br/>어떠한 방식으로<br/>디톡싱하시나요?</h1>
            <input 
              type="text" 
              placeholder="의견을 입력하세요" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-input"
            />
            <input type="submit" value="의견 전송" />
            <Link href="/view" className='add-back'>돌아가기</Link>
        </form>
    </div>
  );
}
