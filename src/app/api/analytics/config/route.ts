import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Only admin users can update analytics config
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    
    // Find existing config
    const existingConfig = await prisma.analyticsConfig.findFirst();
    
    if (!existingConfig) {
      // Create new config if none exists
      const newConfig = await prisma.analyticsConfig.create({
        data: {
          trackingId: body.trackingId || process.env.NEXT_PUBLIC_GA_ID || 'G-G3N8DYCLBM',
          active: body.active !== undefined ? body.active : true,
          ipAnonymization: body.ipAnonymization !== undefined ? body.ipAnonymization : true,
          trackPageViews: body.trackPageViews !== undefined ? body.trackPageViews : true,
          trackEvents: body.trackEvents !== undefined ? body.trackEvents : true
        }
      });
      
      return NextResponse.json(newConfig);
    }
    
    // Update existing config
    const updatedConfig = await prisma.analyticsConfig.update({
      where: { id: existingConfig.id },
      data: {
        trackingId: body.trackingId !== undefined ? body.trackingId : undefined,
        active: body.active !== undefined ? body.active : undefined,
        ipAnonymization: body.ipAnonymization !== undefined ? body.ipAnonymization : undefined,
        trackPageViews: body.trackPageViews !== undefined ? body.trackPageViews : undefined,
        trackEvents: body.trackEvents !== undefined ? body.trackEvents : undefined
      }
    });
    
    return NextResponse.json(updatedConfig);
  } catch (error) {
    console.error('Error updating analytics config:', error);
    return NextResponse.json(
      { error: 'Failed to update analytics configuration' },
      { status: 500 }
    );
  }
}
