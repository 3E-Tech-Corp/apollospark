# ApolloSpark 🎵

**Cultural Exchange in Musical Arts — USA & China**

A marketing site for a nonprofit dedicated to promoting cultural exchange in the musical arts between the United States and China. ApolloSpark discovers and nurtures young rising talents, providing mentoring, performance exposure, and touring opportunities in both countries.

## Tech Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS v4
- **Backend:** .NET 8 + Dapper + SQL Server
- **Auth:** JWT (Bearer tokens)
- **Deployment:** IIS via GitHub Actions

## Project Structure

```
apollospark/
├── frontend/              # React SPA
│   ├── src/
│   │   ├── pages/         # Home, About, Artists, Programs, Events, Contact, Admin
│   │   ├── components/    # Navbar, Footer, HeroSection, ArtistCard, EventCard
│   │   ├── services/      # API client
│   │   └── contexts/      # Auth context
│   └── ...
├── backend/
│   └── ProjectTemplate.Api/
│       ├── Controllers/   # Artist, Event, Content, Contact, Auth, Health
│       ├── Services/      # Business logic
│       ├── Models/        # Data models
│       └── Migrations/    # SQL schema
├── Deployment/            # IIS deployment scripts
└── .github/workflows/     # CI/CD
```

## API Endpoints

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/artist` | GET | Public | List all artists |
| `/api/artist/featured` | GET | Public | Featured artists |
| `/api/artist/{id}` | GET | Public | Get artist by ID |
| `/api/artist` | POST | Admin | Create artist |
| `/api/artist/{id}` | PUT | Admin | Update artist |
| `/api/artist/{id}` | DELETE | Admin | Delete artist |
| `/api/event` | GET | Public | List all events |
| `/api/event/upcoming` | GET | Public | Upcoming events |
| `/api/event/past` | GET | Public | Past events |
| `/api/content` | GET | Public | All content blocks |
| `/api/content/{key}` | GET | Public | Content block by key |
| `/api/contact` | POST | Public | Submit contact form |
| `/api/auth/login` | POST | Public | Login |
| `/api/auth/setup` | POST | Public | Initial admin setup |

## Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend/ProjectTemplate.Api
dotnet run
```

## Design

- **Color Palette:** Deep navy (#0a1628) + warm gold (#c9a84c) + white
- **Style:** Modern, elegant, cinematic — concert hall meets cultural bridge
- **Mobile-first** responsive design
- Public site requires no authentication
- Admin dashboard at `/admin` (login via footer link)
