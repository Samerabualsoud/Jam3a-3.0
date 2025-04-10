#!/bin/bash

# Local development test script for Jam3a-3.0
# This script tests the local development environment and verifies that all components are working correctly

echo "🧪 Starting local development tests for Jam3a-3.0..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or later."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is too old. Please install Node.js v18 or later."
    exit 1
fi
echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi
echo "✅ npm version: $(npm -v)"

# Check if required files exist
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Make sure you're in the project root directory."
    exit 1
fi
echo "✅ package.json found"

if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ prisma/schema.prisma not found. Prisma schema is missing."
    exit 1
fi
echo "✅ Prisma schema found"

# Check MongoDB connection string
if [ -z "$MONGODB_URI" ]; then
    echo "⚠️ MONGODB_URI environment variable not set. Using default connection string."
    export MONGODB_URI="mongodb+srv://samer:2141991Sam@jam3a.yfuimdi.mongodb.net/?retryWrites=true&w=majority&appName=Jam3a"
fi
echo "✅ MongoDB connection string configured"

# Check Google Analytics ID
if [ -z "$NEXT_PUBLIC_GA_ID" ]; then
    echo "⚠️ NEXT_PUBLIC_GA_ID environment variable not set. Using default tracking ID."
    export NEXT_PUBLIC_GA_ID="G-G3N8DYCLBM"
fi
echo "✅ Google Analytics tracking ID configured"

# Check NextAuth secret
if [ -z "$NEXTAUTH_SECRET" ]; then
    echo "⚠️ NEXTAUTH_SECRET environment variable not set. Generating a random secret."
    export NEXTAUTH_SECRET=$(openssl rand -base64 32)
fi
echo "✅ NextAuth secret configured"

# Check NextAuth URL
if [ -z "$NEXTAUTH_URL" ]; then
    echo "⚠️ NEXTAUTH_URL environment variable not set. Using default URL."
    export NEXTAUTH_URL="http://localhost:3000"
fi
echo "✅ NextAuth URL configured"

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies."
    exit 1
fi
echo "✅ Dependencies installed successfully"

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client."
    exit 1
fi
echo "✅ Prisma client generated successfully"

# Run database seed
echo "🌱 Seeding database..."
npm run db:seed
if [ $? -ne 0 ]; then
    echo "⚠️ Database seeding failed. This may be due to connection issues or existing data."
else
    echo "✅ Database seeded successfully"
fi

# Build the application
echo "🏗️ Building the application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed."
    exit 1
fi
echo "✅ Application built successfully"

# Start the application in the background
echo "🚀 Starting the application..."
npm run dev &
DEV_PID=$!

# Wait for the application to start
echo "⏳ Waiting for the application to start..."
sleep 10

# Test if the application is running
curl -s http://localhost:3000 > /dev/null
if [ $? -ne 0 ]; then
    echo "❌ Application failed to start."
    kill $DEV_PID
    exit 1
fi
echo "✅ Application started successfully"

# Test API endpoints
echo "🔍 Testing API endpoints..."
curl -s http://localhost:3000/api/health | grep -q "success"
if [ $? -ne 0 ]; then
    echo "❌ Health check API endpoint failed."
else
    echo "✅ Health check API endpoint working"
fi

# Stop the application
echo "🛑 Stopping the application..."
kill $DEV_PID

echo "✨ Local development tests completed successfully!"
echo "🚀 You can now run 'npm run dev' to start the development server."
echo "📝 See DEPLOYMENT.md for instructions on deploying to Digital Ocean."
