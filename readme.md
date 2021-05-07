# SETUP BACKEND

### MongoDb

    - Add new project
    - create cluster
    - add database access - add user there
    - network access  - ip whitelist
    - cluster > connect > connect your application

### Postman

    - check APIs
    - very helpful tool

# Setup

### dependencies

     npm i express bcryptjs jsonwebtoken config express-validator mongoose

### dev-dependencies

     npm i -D nodemon concurrently

### Open Vscode

    - create server.js

            const express = require("express");
            const app = express();
            const PORT = process.env.PORT || 5000;

            app.get("/", (req, res) => res.send("Hello World"));
            <!-- app.get("/", (req, res) => res.json({ msg: "Welcome to Contact Keeper API" })); -->


            app.listen(PORT, () =>
            console.log(`Server started on port https://localhost:${PORT}`)
            );

        - create a folder routes/

        /routes
            - auth.js
            - contacts.js
            - users.js

    - create a folder config/

        - defaults.json
            - global variables
            - ex: mongo uri

        - db.js
            - where we connect our mongo database

### start with modals

    - create scheme for User - camelcase !important

            const mongoose = require("mongoose");

            const UserScheme = mongoose.Schema({
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now(),
            },
            });

            module.exports = mongoose.model("user", UserScheme);
