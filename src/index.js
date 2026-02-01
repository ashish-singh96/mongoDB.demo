import express from "express";
import fileUpload from "express-fileupload";
import httpContext from "express-http-context";
import http from "http";
import path from "path";


import { connectDB } from "./config/db.config.js";
import { PORT } from "./config/server.config.js";

import routes from './routes/index.js';
// Assets folder setup
const assetsFolder = path.join(process.cwd(), 'public');

// Error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
};



const app = express();
const server = http.createServer(app);

// Connect to database
await connectDB();

/**
 * CORS Middleware
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS,PATCH"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Authorization, Content-Type, Accept"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(httpContext.middleware);
app.use(express.static(assetsFolder));

app.get("/", (req, res) => {
    res.status(200).send("Backend on working");
});


app.use('/api', routes);


app.use(errorHandler);

server.listen(PORT, () => {
    console.log(`Server Listen At Port : ${PORT}`);
});
