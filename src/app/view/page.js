"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";

export default function Home() {

  return (
    <div className="App">
        <h1>View</h1>



        <h3>임시 추가 버튼</h3>
        <Link href="/view/add" className='add-back'>추가하기</Link>
    </div>
  );
}
