import { NextRequest, NextResponse } from 'next/server';
import { groqChat } from '@/lib/groqClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body?.message;
    const cityId = body?.cityId || 'buffalo-ny';

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ response: 'Please type a message to get started.' });
    }

    const response = await groqChat(message, cityId);
    return NextResponse.json({ response });
  } catch (error: unknown) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      response: 'I encountered an error. Please try again.',
    });
  }
}
