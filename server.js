const express = require("express");
const postRoutes = require("./posts/postRoutes");
const server = express();

//Middleware
server.use(express.json());
server.use("/api/posts", postRoutes);

//Showing that the server is up and running
server.get("/", (req, res) => {
    res.send("Server Operational WebAPI 2!");
});

module.exports = server;