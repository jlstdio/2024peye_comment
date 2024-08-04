import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { content } = await request.json();
    const filePath = path.join(process.cwd(), 'public', 'data', 'comments.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const now = new Date();
    const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;

    const newComment = {
      content,
      timestamp
    };

    jsonData.push(newComment);

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json({ message: 'Comment added successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to add comment' }, { status: 500 });
  }
}
