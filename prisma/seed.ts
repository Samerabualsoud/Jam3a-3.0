import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting database seeding...');

    // Create admin user if it doesn't exist
    const adminEmail = 'admin@jam3a.com';
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (!existingAdmin) {
      console.log('Creating admin user...');
      await prisma.user.create({
        data: {
          name: 'Admin User',
          email: adminEmail,
          hashedPassword: await bcrypt.hash('Admin123!', 10),
          role: 'admin'
        }
      });
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    // Create analytics config if it doesn't exist
    const existingConfig = await prisma.analyticsConfig.findFirst();
    
    if (!existingConfig) {
      console.log('Creating analytics configuration...');
      await prisma.analyticsConfig.create({
        data: {
          trackingId: process.env.NEXT_PUBLIC_GA_ID || 'G-G3N8DYCLBM',
          active: true,
          ipAnonymization: true,
          trackPageViews: true,
          trackEvents: true
        }
      });
      console.log('Analytics configuration created successfully');
    } else {
      console.log('Analytics configuration already exists');
    }

    // Create sample products if none exist
    const productCount = await prisma.product.count();
    
    if (productCount === 0) {
      console.log('Creating sample products...');
      
      const sampleProducts = [
        {
          name: 'Premium Laptop',
          description: 'High-performance laptop with the latest processor and ample storage.',
          price: 1299.99,
          imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
          category: 'Electronics',
          stock: 10
        },
        {
          name: 'Wireless Headphones',
          description: 'Noise-cancelling wireless headphones with premium sound quality.',
          price: 199.99,
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
          category: 'Electronics',
          stock: 25
        },
        {
          name: 'Smart Watch',
          description: 'Track your fitness and stay connected with this stylish smart watch.',
          price: 249.99,
          imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
          category: 'Electronics',
          stock: 15
        },
        {
          name: 'Designer Backpack',
          description: 'Stylish and functional backpack for everyday use.',
          price: 89.99,
          imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
          category: 'Fashion',
          stock: 20
        },
        {
          name: 'Organic Coffee Beans',
          description: 'Premium organic coffee beans from sustainable farms.',
          price: 14.99,
          imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e',
          category: 'Food',
          stock: 50
        }
      ];
      
      for (const product of sampleProducts) {
        await prisma.product.create({ data: product });
      }
      
      console.log('Sample products created successfully');
    } else {
      console.log(`${productCount} products already exist in the database`);
    }

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
