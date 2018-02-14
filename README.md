# Express Sessions

The code in this repository is based on the
[Express sessions](https://glebbahmutov.com/blog/express-sessions/)
article.

The original repository, noted in the article, has tags for each step of the
tutorial and this repository does not.

See header by using the following curl command for server access:

```
curl -D - http://localhost:3000
curl --cookie-jar cookies -D - http://localhost:3000 # store cookies file
curl --cookie cookies -D - http://localhost:3000 # used stored cookies
```

Use the python httpie to for automated session cookie storage.

```
sudo apt install httpie
http http://localhost:3000 # no sessions
http --session=my http://localhost:3000
cat ~/.httpie/sessions/localhost_3000/my.json
http --verify=no --session=my https://localhost:3000/ # secure self-signed cert
```

When using the client.js file and `request-promise` make sure to
`touch cookie.json`.

The
[Express over HTTPS](http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/)
article was used for https setup instructions.
The pass pharse `secrete` was used and then removed by the following commands.

```
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 # used
openssl rsa -in key.pem -out newkey.pem && mv newkey.pem key.pem # removed
```
