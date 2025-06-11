## About

This is the backend of a canvassing app that is used to keep track of contacts who a canvasser has engaged with and to manage notes about each contact.

## Tech stack

- MySQL database
- Node with Express
- Vitest for testing API

## Installation and Setup

I developed this app using Node version `v23.11.0`.

`npm install` to install package dependencies

## Scripts

- `npm run seed` to populate database with dummy data
- `npm run dev` to start server, will fallback to 3000 if no port is provided in .env
- `npx vitest run` to run tests in contacts.test.ts
