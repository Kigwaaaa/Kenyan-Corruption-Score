#!/bin/bash

# Kenya Finance Watch - Render Deployment Script

echo "🚀 Preparing Kenya Finance Watch for Render deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if all required files exist
echo "📋 Checking required files..."

required_files=("package.json" "requirements.txt" "server.py" "render.yaml" "vite.config.js")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing required file: $file"
        exit 1
    fi
done

echo "✅ All required files found"

# Check if data files exist
echo "📊 Checking data files..."
data_files=("data.json" "irregularities.json" "leadership.json")
for file in "${data_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "⚠️  Warning: Missing data file: $file"
    else
        echo "✅ Found: $file"
    fi
done

# Build the project locally to test
echo "🔨 Testing build process..."
if npm run build; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi

echo ""
echo "🎉 Your project is ready for Render deployment!"
echo ""
echo "📝 Next steps:"
echo "1. Push your code to GitHub/GitLab:"
echo "   git remote add origin <your-repo-url>"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to Render:"
echo "   - Go to https://render.com"
echo "   - Sign up/Login"
echo "   - Click 'New +' → 'Blueprint'"
echo "   - Connect your repository"
echo "   - Render will automatically deploy both services"
echo ""
echo "3. Your app will be available at:"
echo "   - Frontend: https://kenya-finance-watch-frontend.onrender.com"
echo "   - Backend API: https://kenya-finance-watch-api.onrender.com"
echo ""
echo "🔧 Manual deployment option:"
echo "   - Deploy backend as 'Web Service' (Python)"
echo "   - Deploy frontend as 'Static Site'"
echo ""
echo "📚 For more details, see README.md" 