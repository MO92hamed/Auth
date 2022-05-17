# Authentication

this project is an authentication systeme 



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


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)





