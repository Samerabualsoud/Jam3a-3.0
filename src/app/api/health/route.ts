import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { testDatabaseConnection } from '@/lib/db/utils';

export async function GET() {
  try {
    // Test database connection
    const isConnected = await testDatabaseConnection();
    
    if (!isConnected) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Database connection failed',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      status: 'success',
      message: 'API is working correctly',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
