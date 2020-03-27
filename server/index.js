const express = require("express");
const path = require("path");


const PORT = process.env.PORT || 5000;
const app = express();

// function forceSSL(req, res, next) {
//   // The 'x-forwarded-proto' check is for Heroku
//   if (!req.secure && process.env.NODE_ENV !== "development") {
//     return res.redirect('https://' + req.get('host') + req.url);
//   }
//   next();
// }

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

// All remaining requests return the React app, so it can handle routing.
// app.get("*", forceSSL, function(request, response) {
//   response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
// });

app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, function() {
  console.error(`Node listening on port ${PORT}`);
});
