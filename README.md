# Canvassing app

This repo contains source files for a full-stack application that helps community organizers manage their contacts and notes about each of their contacts. It enables community organizers to store contact information of people who they have reached out to. Users can create new contacts, view existing contacts, filter for a subset of their contacts, and delete contacts. It also supports inline editing of notes, and it is responsive on smaller screen widths.

## Tech Stack

- [MySQL](https://www.mysql.com/) database
- [Node](https://nodejs.org/en) version `v23.11.0` and [Express](https://expressjs.com/) for creating the Contacts API
- [Vitest](https://vitest.dev/) for testing the Contacts API
- [React](https://react.dev/) for building the user interface and managing state
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

In the backend folder, run `npm run dbsetup` followed by `npm run seed`
