# Authentication

this project is an authentication systeme using Node.js expressjs and MongoDB



## Dependencies
- express
- bcrypt
- dotenv
- mongoose
- jsonwebtoken
-  nodemon
## Roadmap

- Create server

- Add auth-router

- Create user with POST /auth/register

   - check if email is unique
   - hash pasword

   - insert into database

- Login user with POST /auth/LOGIN    

   - check if email in database.

   - Compare password with hashed password in database.

   - create and assign a JWT 



## Deployment

To deploy this project run

```bash
  npm install
```
```bash
  npm start
```

## Authors

- https://github.com/MO92hamed








