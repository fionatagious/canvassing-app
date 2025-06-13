# Canvassing app

This repo contains source files for a full-stack application that helps community organizers manage their contacts and notes about each of their contacts. It enables community organizers to store contact information of people who they have reached out to or who they intend to reach out to in the future. Users can create new contacts, view existing contacts, filter for a subset of their contacts, and delete contacts. It also supports inline editing of notes, and it is responsive on smaller screen widths.

## Tech Stack

Backend:

- [MySQL](https://www.mysql.com/) database
- [Node](https://nodejs.org/en) version `v23.11.0` and [Express](https://expressjs.com/) for creating the Contacts API
- [Vitest](https://vitest.dev/) for testing the Contacts API

Frontend:

- [React](https://react.dev/) for frontend UI components, managing state, and client-side routing
- [Tailwind](https://tailwindcss.com/) for styling components, and I used colors from Empower's public-facing [website](https://empowerproject.us/).
- [Yup](https://github.com/jquense/yup) for client-side form validations
- [Cypress](https://docs.cypress.io) for frontend end-to-end testing

## Local setup

### Clone the repository

```bash
gh repo clone fionatagious/canvassing-app
```

### Install dependencies

The frontend and backend are completely separate, each with its own set of dependencies defined in the respective package.json files within their directories.

If you wish to run this app locally, cd into each folder (`/frontend` and `/backend`) and run `npm install`.

### Create database and schema

1. cd into the backend folder
2. Run `npm run dbsetup` to run a script that will create the database and Contacts table.
3. Then, run `npm run seed` to populate the Contacts table with seed data.

## Deployment Details

This app is accessible via https://empower.fiona.works. I deployed it using the following infrastructure:

- Amazon EC2 hosts the full-stack app, including:

  - An Express + TypeScript backend API
  - A statically served frontend built with Vite
  - Running on Node.js with PM2 to manage the server process

- Amazon CloudFront is used as a CDN to cache and serve frontend assets (e.g., HTML, JS, CSS) for improved performance.

- The React frontend is bundled using Vite by running npm run build. It generates optimized static files (index.html, JavaScript, and CSS). These files are moved into the Express server’s public/ directory, where they are served as static assets to the client.

- PM2 is used to keep the server running and restart it on failure or reboot.
