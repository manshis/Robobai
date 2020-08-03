# Robobai

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1.

## Prerequiste

- node.js - [Download page](https://nodejs.org/en/download/) .
- mongodb - [Download and Install MongoDB](https://www.mongodb.com/download-center/community) .

## Run application

### Config File Changes

- Go to src/server/config.js
  - `connectionString`: Connection string of your local or remote mongoDB server.
  - `databaseName`: Name of the database

### Install dependencies

Run `npm install` to install all dependencies.

### Build and Run

Run `npm run start-app` to build and run the project. This command will first build the project and store the artifact in the `dist/` directory. Then it will start the server at port 3000.

Navigate to `http://localhost:3000/`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
