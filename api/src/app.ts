import express, { Request, Response } from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import lusca from "lusca";
import mongo from "connect-mongo";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

// Controllers (route handlers)
import todosController from "./controllers/todos/todos.controller";


// Create Express server
const app = express();

const corsOptions = {
    origin: "*",
	// allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
	methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH", "HEAD"],
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Connect to MongoDB
const MongoStore = mongo(session);
const mongoUrl = MONGODB_URI;
if (process.env.NODE_ENV !== "test") {
    mongoose.Promise = bluebird;

    mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }).then(
        () => {
            /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
            console.log("MongoDB connected!");
        },
    ).catch(err => {
        console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        // process.exit();
    });
}

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.use("/todos", todosController);
// app.get("/specialists", specialistsController.index);

export default app;
