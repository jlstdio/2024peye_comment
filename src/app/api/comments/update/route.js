import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function PUT(request) {
  try {
    const { index, active } = await request.json();
    const filePath = path.join(process.cwd(), 'public', 'data', 'comments.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const updatedData = jsonData.map(comment => 
      comment.index === index ? { ...comment, active } : comment
    );

    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({ message: 'Comment updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update comment' }, { status: 500 });
  }
}
