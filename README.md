# Weather Timeline Viewer

A modern, enterprise-level weather dashboard built with React, TypeScript, and Clean Architecture principles. Features real-time weather data, interactive charts, storm detection, and comprehensive forecasting.


## Architecture

Built following **Clean Architecture** principles with clear separation of concerns:

```
src/
├── domain/          # Business entities and rules
├── infrastructure/  # External integrations (API, mappers)
├── application/     # Use cases, queries, state management
├── presentation/    # UI components, pages, routing
└── utils/          # Helper functions
```

## Tech Stack

- **React 18** + **TypeScript** - Type-safe component library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management
- **TanStack Query** - Server state & caching
- **Zod** - Runtime type validation
- **Recharts** - Interactive data visualization
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites
- Node.js 18+ (Note: Latest Vite requires 20.19+ or 22.12+)
- npm or yarn
- WeatherAPI.com API key (free tier available)

### Installation

1. **Install dependencies**
```

2. **Configure API Key**

Get a free API key from [WeatherAPI.com](https://www.weatherapi.com/)

Update the `.env` file in the root directory:
```env
VITE_WEATHER_API_KEY=your_api_key_here
VITE_WEATHER_API_BASE_URL=https://api.weatherapi.com/v1
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## Project Structure

```
weather/
├── src/
│   ├── domain/
│   │   ├── entities/          # Core business models
│   │   ├── repositories/      # Repository interfaces
│   │   └── usecases/         # Business logic
│   ├── infrastructure/
│   │   ├── http/             # API clients
│   │   ├── mappers/          # Data transformation
│   │   ├── schemas/          # Zod validation schemas
│   │   └── repositories/     # Repository implementations
│   ├── application/
│   │   ├── queries/          # TanStack Query hooks
│   │   └── store/           # Zustand state management
│   ├── presentation/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   └── router/         # Route configuration
│   └── utils/              # Helper functions
├── public/                 # Static assets
└── index.html            # Entry HTML
```

##  Key Components

- **HourlyTimeline** - 48-hour scrollable timeline
- **WeatherChart** - Interactive metric visualizations
- **AlertBanner** - Dynamic weather alerts
- **ForecastCard** - Daily forecast cards
- **AQIWidget** - Air quality monitoring
- **CurrentWeather** - Comprehensive current conditions

## API Integration

Uses [WeatherAPI.com](https://www.weatherapi.com/) for all weather data.
