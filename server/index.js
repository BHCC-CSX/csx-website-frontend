const express = require("express");
var forceSSL = require('express-force-ssl');
const path = require("path");

const PORT = process.env.PORT || 5000;
const app = express();

// Force SSL
app.use(forceSSL)

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

// All remaining requests return the React app, so it can handle routing.
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, function() {
  console.error(`Node listening on port ${PORT}`);
});
