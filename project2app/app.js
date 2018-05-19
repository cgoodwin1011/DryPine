const express = require('express');
const path = require('path');
const app = express();


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

require("./routes/index.js")(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'))

const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const user = {
  username: 'test-user',
  passwordHash: 'bcrypt-hashed-password',
  id: 1
}

passport.use(new LocalStrategy(
 (username, password, done) => {
    findUser(username, (err, user) => {
      if (err) {
        return done(err)
      }

      // User not found
      if (!user) {
        return done(null, false)
      }

      // Always use hashed passwords and fixed time comparison
      bcrypt.compare(password, user.passwordHash, (err, isValid) => {
        if (err) {
          return done(err)
        }
        if (!isValid) {
          return done(null, false)
        }
        return done(null, user)
      })
    })
  }
))