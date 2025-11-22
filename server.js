const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./database/connect");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// ========== MIDDLEWARE ==========
app
  .use(bodyParser.json())
  .use(
    session({
      secret: "supersecretkey", 
      resave: false,
      saveUninitialized: true,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] }))
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  })
  .use("/", require("./routes"));


// ========== GITHUB PASSPORT STRATEGY ==========
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // NO "err", NO "user" here — passport handles errors automatically
      return done(null, profile); 
    }
  )
);

// ========== SESSION MANAGEMENT ==========
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// ========== ROUTES ==========
app.get("/", (req, res) => {
  res.send(
    req.session.user
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged out"
  );
});

// GITHUB LOGIN
app.get("/login", passport.authenticate("github"));

// GITHUB CALLBACK
app.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/api-docs" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

// LOGOUT
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.session.destroy();
    res.redirect("/");
  });
});

// ========== START SERVER ==========
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected — Server running on port ${port}`);
    });
  }
});
