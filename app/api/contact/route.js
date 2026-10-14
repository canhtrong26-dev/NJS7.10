import { NextResponse } from 'next/server';
import { csrfMiddleware } from '../../../middleware/csrf';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

export async function POST(req) {
  const csrfResponse = await csrfMiddleware(req);
  if (csrfResponse) return csrfResponse;

  const { name, email, message } = await req.json();

  // Làm sạch dữ liệu đầu vào
  const cleanName = purify.sanitize(name);
  const cleanEmail = purify.sanitize(email);
  const cleanMessage = purify.sanitize(message);

  // Xử lý dữ liệu

  return NextResponse.json({ message: 'Đã nhận được tin nhắn của bạn!' });
}

export async function GET(req) {
  return await csrfMiddleware(req);
}