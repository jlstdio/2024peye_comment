"use client";

import React, { useState, useEffect } from 'react';

export default function Home() {


  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    fetch('./data/comments.json')
      .then(response => response.json())
      .then(data => setCommentsData(data));
  }, []);

  return (
    <div className="galleryView">
      {
        commentsData.map((e, i) => (

            <div key={i} className='card-item'>
              <h2 className="wall-content basic-font">{e.content}</h2>
              <p className="wall-timestamp">
                {e.timestamp.substring(0, 4)}년 
                {e.timestamp.substring(4, 6)}월 
                {e.timestamp.substring(6, 8)}일 
                {e.timestamp.substring(8, 10)}:{e.timestamp.substring(10, 12)}
              </p>
            </div>

          )
        )
      }
    </div>
  );
}
