import { NextResponse } from 'next/server';
import { getData, saveData } from '@/lib/data';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const data = getData();
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
      date: new Date().toISOString(),
      read: false
    };
    
    data.messages = [newMessage, ...(data.messages || [])];
    saveData(data);
    
    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    const data = getData();
    data.messages = (data.messages || []).filter(m => m.id !== id);
    saveData(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
