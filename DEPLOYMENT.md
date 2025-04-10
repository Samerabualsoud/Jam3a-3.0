# Jam3a-3.0 Deployment Guide

This guide provides instructions for deploying the Jam3a-3.0 application to Digital Ocean App Platform.

## Prerequisites

- Digital Ocean account
- GitHub account with access to the repository
- MongoDB Atlas account (already set up)

## Deployment Options

### Option 1: Digital Ocean App Platform (Recommended)

1. **Log in to Digital Ocean**
   - Go to [Digital Ocean](https://cloud.digitalocean.com/)
   - Sign in to your account

2. **Create a New App**
   - Click on "Apps" in the left sidebar
   - Click "Create App"
   - Select "GitHub" as the source
   - Connect your GitHub account if not already connected
   - Select the "Samerabualsoud/Jam3a-3.0" repository
   - Select the main branch

3. **Configure App Settings**
   - The app will automatically detect the Next.js application
   - Ensure the following environment variables are set:
     - `MONGODB_URI`: Your MongoDB connection string
     - `NEXTAUTH_SECRET`: A secure random string for NextAuth.js
     - `NEXTAUTH_URL`: The URL of your deployed application (can use ${APP_URL})
     - `NEXT_PUBLIC_GA_ID`: G-G3N8DYCLBM

4. **Review and Launch**
   - Review all settings
   - Click "Create Resources"
   - Wait for the deployment to complete (typically 5-10 minutes)

5. **Access Your Application**
   - Once deployment is complete, click on the app URL to access your application
   - Verify that all features are working correctly

### Option 2: Docker Deployment

If you prefer to deploy using Docker:

1. **Build the Docker Image**
   ```bash
   docker build -t jam3a-3-0 .
   ```

2. **Run the Docker Container**
   ```bash
   docker run -p 3000:3000 \
     -e MONGODB_URI="mongodb+srv://samer:2141991Sam@jam3a.yfuimdi.mongodb.net/?retryWrites=true&w=majority&appName=Jam3a" \
     -e NEXTAUTH_SECRET="your-nextauth-secret-key-here" \
     -e NEXTAUTH_URL="http://localhost:3000" \
     -e NEXT_PUBLIC_GA_ID="G-G3N8DYCLBM" \
     jam3a-3-0
   ```

3. **Access Your Application**
   - Open your browser and navigate to http://localhost:3000

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| MONGODB_URI | MongoDB connection string | Yes |
| NEXTAUTH_SECRET | Secret key for NextAuth.js | Yes |
| NEXTAUTH_URL | URL of your deployed application | Yes |
| NEXT_PUBLIC_GA_ID | Google Analytics tracking ID | Yes |

## Troubleshooting

### Database Connection Issues
- Verify that your IP address is whitelisted in MongoDB Atlas
- Check that the connection string is correct
- Ensure the database user has the correct permissions

### Deployment Failures
- Check the deployment logs in Digital Ocean
- Verify that all environment variables are set correctly
- Ensure the repository has the correct permissions

### Application Errors
- Check the application logs in Digital Ocean
- Verify that the database is properly seeded
- Check that Google Analytics is properly configured

## Support

If you encounter any issues with deployment, please contact the development team for assistance.
