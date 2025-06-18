#!/bin/bash

# Build script for Kenya Finance Watch
echo "🚀 Building Kenya Finance Watch..."

# Navigate to the project directory
cd kenya-finance-watch

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

echo "✅ Build completed successfully!" 