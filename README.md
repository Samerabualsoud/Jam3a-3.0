# Jam3a-3.0 Documentation

## Overview

Jam3a-3.0 is a modern e-commerce platform built with Next.js 14, TypeScript, and MongoDB. This application is a complete rebuild of the original Jam3a-2.0 codebase, featuring improved architecture, performance, and maintainability.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, Shadcn UI
- **State Management**: Zustand
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Analytics**: Google Analytics
- **Deployment**: Digital Ocean App Platform, Docker

## Features

- User authentication and account management
- Product browsing with filtering and sorting
- Shopping cart functionality
- Order management
- Admin dashboard for product and order management
- Google Analytics integration
- Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later
- MongoDB Atlas account

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Samerabualsoud/Jam3a-3.0.git
   cd Jam3a-3.0
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb+srv://samer:2141991Sam@jam3a.yfuimdi.mongodb.net/?retryWrites=true&w=majority&appName=Jam3a
   NEXTAUTH_SECRET=your-nextauth-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   NEXT_PUBLIC_GA_ID=G-G3N8DYCLBM
   ```

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Seed the database:
   ```bash
   npm run db:seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

Run the local development test script to verify your environment:
```bash
./test-local-dev.sh
```

## Project Structure

```
jam3a-3.0/
├── .do/                  # Digital Ocean configuration
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   └── ...           # Page routes
│   ├── components/       # React components
│   │   ├── analytics/    # Analytics components
│   │   ├── forms/        # Form components
│   │   ├── layout/       # Layout components
│   │   └── ui/           # UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   │   └── db/           # Database utilities
│   └── store/            # Zustand state stores
├── .env                  # Environment variables
├── Dockerfile            # Docker configuration
├── DEPLOYMENT.md         # Deployment instructions
└── package.json          # Project dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js authentication

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product (admin only)
- `GET /api/products/[id]` - Get a specific product
- `PATCH /api/products/[id]` - Update a product (admin only)
- `DELETE /api/products/[id]` - Delete a product (admin only)

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/user` - Get current user's orders
- `GET /api/orders/[id]` - Get a specific order
- `PATCH /api/orders/[id]` - Update order status (admin only)

### Analytics
- `GET /api/analytics/config` - Get analytics configuration
- `PATCH /api/analytics/config` - Update analytics configuration (admin only)

### System
- `GET /api/health` - System health check

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.
