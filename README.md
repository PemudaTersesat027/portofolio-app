# Portfolio WebApp

**A Modern & Customizable Portfolio Web Application Template**

A modern, responsive, and customizable portfolio web application template built with Laravel, Inertia.js, and React.

Designed to provide a solid foundation for developers, designers, freelancers, and professionals who want to build their own personal portfolio website.

The project combines a modern frontend experience with a structured Laravel backend, making it flexible for future customization and feature expansion.

> Currently under active development.

---

## Project Overview

| Property | Details |
|---|---|
| Project Name | Portfolio WebApp |
| Type | Web Application Template |
| Version | `v0.1.0` |
| Development Status | Early Development |
| License | MIT |

## Features

### Current Release — v0.1.0

- Laravel application foundation.
- Inertia.js integration.
- React JSX frontend configuration.
- Tailwind CSS v4 integration.
- shadcn/ui component library.
- Lucide React icon integration.
- Initial application structure and configuration.

### Planned Features

- [ ] Modern portfolio landing page.
- [ ] Personal profile and About Me section.
- [ ] Dynamic project showcase.
- [ ] Skills and technology showcase.
- [ ] Work experience and education section.
- [ ] Contact section.
- [ ] Responsive desktop and mobile layouts.
- [ ] Reusable UI components.
- [ ] Admin dashboard.
- [ ] Portfolio content management.

## Technology Stack

| Technology | Purpose |
|---|---|
| Laravel 13 | Backend framework |
| Inertia.js v2 | Backend and frontend integration |
| React 18 | Frontend library |
| Tailwind CSS v4 | Styling framework |
| shadcn/ui | UI component system |
| Lucide React | Icon library |
| Vite 8 | Frontend build tool |
| Geist | Typography |

## Requirements

- PHP 8.3+
- Composer
- Node.js 20.19+ or 22.12+
- npm
- SQLite or MySQL

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install dependencies

```bash
composer install
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
php artisan key:generate
```

Configure your database connection inside `.env`.

### 4. Run migrations

```bash
php artisan migrate
```

### 5. Start development server

```bash
composer run dev
```

Open the application at:

`http://localhost:8000`

### Production Build

```bash
npm run build
```

## Project Structure

```text
resources/
├── css/
│   └── app.css
├── js/
│   ├── Components/
│   ├── Layouts/
│   ├── Pages/
│   ├── components/
│   │   └── ui/
│   └── lib/
└── views/
    └── app.blade.php

routes/
├── web.php
└── auth.php

tests/
└── Feature/
```

## Development Roadmap

| Version | Milestone |
|---|---|
| `v0.1.0` | Initial setup and foundation |
| `v0.2.0` | Portfolio landing page |
| `v0.3.0` | Dynamic portfolio sections |
| `v0.4.0` | Admin dashboard |
| `v0.5.0` | Content management features |
| `v1.0.0` | First stable release |

For detailed updates, see [CHANGELOG.md](CHANGELOG.md).

## Design Philosophy

The application aims to provide a portfolio experience that is:

- **Modern** — Contemporary design and visual language.
- **Minimalist** — Clean layouts without unnecessary complexity.
- **Responsive** — Optimized for desktop and mobile devices.
- **Flexible** — Easy to customize and extend.
- **Reusable** — Built with reusable components and consistent patterns.

## Contributing

Suggestions, feedback, and contributions are welcome. Feel free to open an issue or submit a pull request.

## License

Distributed under the [MIT License](LICENSE).

---

**Built with Laravel, React, and a passion for creating.**
