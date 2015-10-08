## OAuth2 Server

This is a mini application for create a server of OAuth22 with [Express](http://expressjs.com/) on [Nodejs](https://nodejs.org/en/)

## Requisites

- Install [Node](https://nodejs.org/en/download/)
- Install [MongoDB](https://www.mongodb.org/)

## Setup Environment Development

- Clone the repo.
- Run `npm install` to install all dependencies.
- Run `node seed.js` to create a user account.
- Run `node server.js` to start server.
- Use POSTAM or CURL to test the next URL.

```
POST /oauth/token HTTP/1.1
Host: localhost:3000
Authorization: Basic cGFwZXJzMzoxMjM=
Content-Type: application/x-www-form-urlencoded

grant_type=password&email=test@ayalo.com&password=test
```

*You should include your client credentials in the Authorization header ("Basic " + client_id:client_secret base64'd)*
- This will return the following

```
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
Cache-Control: no-store
Pragma: no-cache

{
  "token_type": "bearer",
  "access_token": "abe627589f48add82fb78e8ccbd61db37475c2d2",
  "expires_in": 3600
}
```
---

With :heart: by [yoelfme](https://github.com/yoelfme)