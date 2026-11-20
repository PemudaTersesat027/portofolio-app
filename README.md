<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Starter Kit Overview

This repository is a ready-to-use Laravel starter kit with a React + Inertia frontend. It keeps Laravel's server-side routing and authentication while shipping a modern Vite, Tailwind CSS, and shadcn/ui setup.

### Included Features

- Laravel 13 with Inertia.js v2 and React 18.
- Laravel Breeze authentication flow: register, login, remember me, forgot/reset password, email verification, confirm password, and logout.
- Profile management: update name/email, update password, and delete account.
- Dashboard and welcome pages.
- Ziggy's global `route()` helper via the `@routes` Blade directive.
- Pest feature tests covering authentication, email verification, password confirmation/reset/update, and profile changes.
- Laravel Boost installed with project guidelines, skills, and MCP tools for AI-assisted development.

### Frontend Stack

- **Vite 8** with `@vitejs/plugin-react` v6 and `laravel-vite-plugin` v3.
- **Tailwind CSS v4** through `@tailwindcss/vite`. The theme is CSS-first in `resources/css/app.css`; there is no `tailwind.config.js` or PostCSS config.
- **shadcn/ui** using the Radix base, Nova preset, neutral base color, and CSS variables. Primitives live in `resources/js/components/ui`.
- **Lucide React** icons.
- **Geist** variable font bundled locally through `@fontsource-variable/geist`.
- The `@` alias points to `resources/js` in both `jsconfig.json` and `vite.config.js`.

### Requirements

- PHP 8.3+
- Node.js 20.19+ or 22.12+ (required by Vite 8)
- Composer and npm

### Getting Started

```bash
composer run setup
composer run dev
```

`composer run setup` installs PHP and JS dependencies, creates `.env`, generates the app key, runs migrations, and builds the frontend assets. `composer run dev` starts the Laravel server, Vite, and the other dev processes through `php artisan dev`.

For a manual setup:

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm install
npm run dev
```

Build production assets with:

```bash
npm run build
```

### Project Structure

```text
resources/
├── css/app.css                  # Tailwind v4 theme + shadcn design tokens
├── js/
│   ├── Components/              # App-specific components wired to shadcn/ui
│   ├── Layouts/                 # Authenticated and guest layouts
│   ├── Pages/                   # Inertia pages (Auth, Dashboard, Profile, Welcome)
│   ├── components/ui/           # shadcn/ui primitives
│   └── lib/utils.js             # cn() helper re-export
├── views/app.blade.php          # @routes, @viteReactRefresh, @vite, @inertia
routes/                          # web.php and auth.php
tests/Feature/                   # Pest feature tests
```

### UI Components

The following shadcn/ui primitives are already installed: `button`, `card`, `input`, `label`, `checkbox`, `dialog`, `dropdown-menu`, `separator`, and `skeleton`. Add more with:

```bash
npx shadcn@latest add <component>
```

### Dependency Notes

- Vite 8 requires `@vitejs/plugin-react` v6. Do not pin the plugin back to v4 and do not use `--legacy-peer-deps`; the peer versions are intentionally matched.
- `npm audit` may report moderate advisories from the shadcn CLI dependency chain (`shadcn` → `ts-morph` → `@ts-morph/common` → `minimatch`). These are development-tooling advisories and are not part of the shipped browser bundle.

### Testing

```bash
php artisan test --compact
```

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

In addition, [Laracasts](https://laracasts.com) contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

You can also watch bite-sized lessons with real-world projects on [Laravel Learn](https://laravel.com/learn), where you will be guided through building a Laravel application from scratch while learning PHP fundamentals.

## Agentic Development

Laravel's predictable structure and conventions make it ideal for AI coding agents like Claude Code, Cursor, and GitHub Copilot. Install [Laravel Boost](https://laravel.com/docs/ai) to supercharge your AI workflow:

```bash
composer require laravel/boost --dev

php artisan boost:install
```

> This starter kit already includes Laravel Boost, so the commands above are only needed when starting from a fresh Laravel app.

Boost provides your agent 15+ tools and skills that help agents build Laravel applications while following best practices.

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

> For changes to this starter kit itself, use this repository's issues and pull requests. The linked guide remains the upstream Laravel reference.

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

> For vulnerabilities specific to this starter kit, please open an issue in this repository instead.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

This starter kit is distributed under the same MIT license unless stated otherwise.
