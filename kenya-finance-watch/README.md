# Kenya Finance Watch

A comprehensive web application for analyzing and monitoring Kenyan ministry budgets and financial data.

## Features

- Ministry budget analysis and visualization
- Interactive charts and graphs
- Detailed sector breakdowns
- Irregularities tracking
- Leadership information

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Chart.js
- **Backend**: Python Flask
- **Deployment**: Render

## Local Development

### Prerequisites

- Node.js (v16 or higher)
- Python 3.9+
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd kenya-finance-watch
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
pip install -r requirements.txt
```

4. Start the development servers:

In one terminal (backend):
```bash
python server.py
```

In another terminal (frontend):
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Deployment to Render

### Option 1: Using render.yaml (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, etc.)

2. Connect your repository to Render:
   - Go to [render.com](https://render.com)
   - Sign up/Login
   - Click "New +" and select "Blueprint"
   - Connect your Git repository
   - Render will automatically detect the `render.yaml` file and deploy both services

3. The deployment will create:
   - **Backend API**: `https://kenya-finance-watch-api.onrender.com`
   - **Frontend**: `https://kenya-finance-watch-frontend.onrender.com`

### Option 2: Manual Deployment

#### Deploy Backend API

1. Create a new Web Service on Render
2. Connect your Git repository
3. Configure:
   - **Environment**: Python
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python server.py`
   - **Plan**: Free

#### Deploy Frontend

1. Create a new Static Site on Render
2. Connect your Git repository
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free

## Environment Variables

### Backend
- `PORT`: Server port (set automatically by Render)
- `PYTHON_VERSION`: Python version (3.9.16)

### Frontend
- `REACT_APP_API_URL`: Backend API URL (set automatically in render.yaml)

## Project Structure

```
kenya-finance-watch/
├── src/                    # React source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   └── data/              # Static data files
├── public/                # Public assets
├── server.py              # Flask backend server
├── requirements.txt       # Python dependencies
├── package.json           # Node.js dependencies
├── vite.config.js         # Vite configuration
├── render.yaml            # Render deployment config
└── README.md              # This file
```

## API Endpoints

- `GET /api/ministries` - Get ministry data
- `GET /data.json` - Get raw data
- `GET /` - Serve React app

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is licensed under the MIT License.
