#!/bin/bash

echo "🚀 Starting Render build process..."

# Navigate to the project directory
echo "📁 Navigating to kenya-finance-watch directory..."
cd kenya-finance-watch

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Copy dist to root
echo "📋 Copying dist folder to root..."
node -e "require('fs').cpSync('dist', '../dist', {recursive: true, force: true})"

# Verify the dist folder exists
echo "✅ Verifying build output..."
if [ -d "../dist" ]; then
    echo "✅ dist folder created successfully at root"
    ls -la ../dist
else
    echo "❌ dist folder not found at root"
    exit 1
fi

echo "🎉 Build completed successfully!" 