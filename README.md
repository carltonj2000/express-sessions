# Express Sessions

The code in this repository is based on the
[Express sessions](https://glebbahmutov.com/blog/express-sessions/)
article.

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

Express https setup instructions found in the  
[Express over HTTPS](http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/)
article used the pass pharse `secrete` for the following command.
`openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365`
and then remove the password via:
`openssl rsa -in key.pem -out newkey.pem && mv newkey.pem key.pem`
