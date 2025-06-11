# Canvassing app

This repo contains source files for a full-stack application that helps community organizers manage their contacts and notes about each of their contacts. It enables community organizers to store contact information, create new contacts, view existing contacts, and delete contacts. It also supports inline editing of notes, and it is responsive on smaller screen sizes and mobile.

## Tech Stack

- [MySQL](https://www.mysql.com/) database
- [Node](https://nodejs.org/en) version `v23.11.0` and [Express](https://expressjs.com/) for creating the Contacts API
- [Vitest](https://vitest.dev/) for testing the Contacts API
- [React](https://react.dev/) for building the user interface and managing state
- [Tailwind](https://tailwindcss.com/) for styling components
- [Yup](https://github.com/jquense/yup) for client-side form validations
- [Cypress](https://docs.cypress.io) for frontend end-to-end testing

## Local setup

### Clone the repository

```bash
gh repo clone fionatagious/canvassing-app
```

### Install dependencies

The frontend and backend are completely separate and rely on their own set of dependencies, which I have outlined in the respective README for each directory.

If you wish to run this app locally, cd into each folder (`/frontend` and `/backend`) and run `npm install`.

### Create database and schema

In the backend folder, enter `mysql -u root`

At the mysql prompt, create a new database with:

1. `CREATE DATABASE canvassing_db;`
2. `USE canvassing_db`
3. Define table schema with `CREATE TABLE contacts`
4. Seed dummy data with `npm run seed`
