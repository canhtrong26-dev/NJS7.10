import { NextResponse } from 'next/server';
import CSRF from 'csrf';

const tokens = new CSRF();

export async function csrfMiddleware(req) {
  const token = req.headers.get('x-csrf-token');
  const secret = req.cookies.get('csrf-secret')?.value;

  if (req.method === 'POST') {
    if (!secret || !token || !tokens.verify(secret, token)) {
      return NextResponse.json({ message: 'Invalid CSRF token' }, { status: 403 });
    }
    return null; 
  } else {
    // Tạo CSRF token mới cho GET request
    const newSecret = await tokens.secret();
    const newToken = tokens.create(newSecret);
    const response = NextResponse.json({ message: 'Token created' });
    response.cookies.set('csrf-secret', newSecret, { httpOnly: true });
    response.headers.set('x-csrf-token', newToken);
    return response;
  }
}