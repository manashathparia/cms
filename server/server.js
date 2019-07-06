"use strict";

const express = require("express");
const db = require("./db");
const morgan = require("morgan");

const app = express();

// Connect to database
db.connect();

app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", require("./api/routes/v1"));

app.listen(process.env.PORT || 8080, () =>
	console.log(`Listening on port ${process.env.PORT || 8080}`)
);
