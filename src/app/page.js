"use client";

import React, { useState, useEffect } from 'react';

export default function Home() {

  const [commentsData, setCommentsData] = useState([]);

  const fetchCommentsData = () => {
    fetch('/data/comments.json')
      .then(response => response.json())
      .then(data => setCommentsData(data));
  };

  useEffect(() => {
    fetchCommentsData();
    // 주기적으로 데이터를 가져오도록 설정  10000ms = 10초
    const intervalId = setInterval(fetchCommentsData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="galleryView">
      {
        commentsData.map((e, i) => (
          e.active &&
            <div key={i} className='card-item' >
              <div className="text" >{e.content}</div>-
            </div>

          )
        )
      }
    </div>
  );
}
