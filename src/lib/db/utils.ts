import { prisma } from '@/lib/db/prisma';

/**
 * Utility function to test MongoDB connection
 * @returns {Promise<boolean>} True if connection is successful, false otherwise
 */
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    // Attempt to query the database
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

/**
 * Utility function to get database statistics
 * @returns {Promise<object>} Database statistics
 */
export async function getDatabaseStats(): Promise<object> {
  try {
    const userCount = await prisma.user.count();
    const productCount = await prisma.product.count();
    const orderCount = await prisma.order.count();
    const analyticsConfig = await prisma.analyticsConfig.findFirst();

    return {
      userCount,
      productCount,
      orderCount,
      analyticsConfigured: !!analyticsConfig,
      connectionStatus: 'connected'
    };
  } catch (error) {
    console.error('Error getting database stats:', error);
    return {
      error: 'Failed to get database statistics',
      connectionStatus: 'disconnected'
    };
  }
}

/**
 * Utility function to handle database errors
 * @param {Error} error The error to handle
 * @param {string} operation The operation that caused the error
 * @returns {object} Error information
 */
export function handleDatabaseError(error: any, operation: string): object {
  console.error(`Database error during ${operation}:`, error);
  
  // Check for common MongoDB errors
  if (error.code === 'P2002') {
    return {
      message: 'A unique constraint would be violated.',
      field: error.meta?.target?.[0] || 'unknown field'
    };
  }
  
  if (error.code === 'P2025') {
    return {
      message: 'Record not found.',
      operation
    };
  }
  
  // Generic error handling
  return {
    message: 'An unexpected database error occurred.',
    operation,
    errorCode: error.code || 'unknown'
  };
}
