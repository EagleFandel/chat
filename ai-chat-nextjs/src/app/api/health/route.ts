import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      chat: 'operational',
      database: 'not_configured', // 将来可以添加数据库状态检查
    },
  });
}