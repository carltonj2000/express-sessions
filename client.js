#!/usr/bin/env node
const FileCookieStore = require("tough-cookie-filestore");
const requestPromise = require("request-promise");
const rp = requestPromise.defaults({
  jar: requestPromise.jar(new FileCookieStore("cookies.json")),
  strictSSL: false, // allows self-signed certs
  rejectUnauthorized: false
});

const requestPage = () => rp("https://localhost:3000/");

requestPage()
  .then(console.dir)
  .then(requestPage)
  .then(console.dir)
  .then(requestPage)
  .then(console.dir)
  .catch(console.error);
