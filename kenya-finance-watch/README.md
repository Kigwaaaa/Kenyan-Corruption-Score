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
- **Deployment**: Render (Static Site)

## Local Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd kenya-finance-watch
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Deployment to Render

### Option 1: Using render.yaml (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, etc.)

2. Connect your repository to Render:
   - Go to [render.com](https://render.com)
   - Sign up/Login
   - Click "New +" and select "Blueprint"
   - Connect your Git repository
   - Render will automatically detect the `render.yaml` file and deploy

3. Your app will be available at: `https://kenya-finance-watch.onrender.com`

### Option 2: Manual Deployment

1. Create a new Static Site on Render
2. Connect your Git repository
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free

## Environment Variables

- `NODE_VERSION`: Node.js version (18.17.0)

## Project Structure

```
kenya-finance-watch/
├── src/                    # React source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   └── data/              # Static data files
├── public/                # Public assets and data files
│   ├── data.json          # Ministry data
│   ├── irregularities.json # Corruption data
│   ├── leadership.json    # Leadership data
│   └── ministries.json    # Detailed ministry data
├── package.json           # Node.js dependencies
├── vite.config.js         # Vite configuration
├── render.yaml            # Render deployment config
└── README.md              # This file
```

## Data Files

The application uses static JSON files for data:
- `public/data.json` - Main ministry budget data
- `public/irregularities.json` - Corruption and irregularities data
- `public/leadership.json` - Leadership information
- `public/ministries.json` - Detailed ministry information

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is licensed under the MIT License.
