#!/usr/bin/env node
const FileCookieStore = require("tough-cookie-filestore");
const requestPromise = require("request-promise");
const rp = requestPromise.defaults({
  jar: requestPromise.jar(new FileCookieStore("cookies.json")),
  strictSSL: false, // allows self-signed certs
  rejectUnauthorized: false
});

const requestPage = previousResponse => {
  const referer = previousResponse ? previousResponse.headers.referer : null;
  if (referer) console.log('previous response referer "%s"', referer);
  return rp({
    url: "https://localhost:3000/",
    resolveWithFullResponse: true,
    headers: { referer: referer }
  });
};

requestPage()
  .then(response => {
    console.log(response.body);
    return requestPage(response);
  })
  .then(response => {
    console.log(response.body);
    return requestPage(response);
  })
  .catch(console.error);
