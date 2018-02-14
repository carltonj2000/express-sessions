#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const app = require("express")();
app.use(require("morgan")("dev"));

const session = require("express-session");
const FileStore = require("session-file-store")(session);
app.use(
  session({
    name: "server-session-cookie-id",
    secret: "my express secret",
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
  })
);

app.get("/", function initViewsCount(req, res, next) {
  if (typeof req.session.views === "undefined") {
    req.session.views = 0;
    return res.end("Welcome to the file session demo. Refresh page!");
  }
  return next();
});
app.get("/", function incrementViewsCount(req, res, next) {
  console.assert(
    typeof req.session.views === "number",
    "missing views count in the session",
    req.session
  );
  req.session.views++;
  return next();
});
app.use(function printSession(req, res, next) {
  console.log("req.session", req.session);
  console.log("req header referer", req.header("referer"));
  return next();
});
app.get("/", function sendPageWithCounter(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("referer", "server referer");
  res.write("<p>views: " + req.session.views + "</p>\n");
  res.end();
});

const server = https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem")
    },
    app
  )
  .listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
  });
