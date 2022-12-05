const cookieSession = require("cookie-session");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const routesHandler = require("./routes/handler.js");
require("./passport");

const app = express();
// For build
// app.set("trust proxy", 1);
// app.use(
//   cookieSession({
//     name: "__session",
//     keys: ["key1"],
//     maxAge: 24 * 60 * 60 * 100,
//     secure: true,
//     httpOnly: true,
//   })
// );
//For dev
app.use(
  cookieSession({
    name: "__session",
    keys: ["key1"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// For build
// app.use(
//   cors({
//     credentials: true,
//     // clientIp
//     origin: "https://abrahammensah.com",
//     methods: "GET, POST, PUT, DELETE",
//   })
// );

// For dev
app.use(
  cors({
    credentials: true,
    // clientIp
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routesHandler);

const PORT = process.env.PORT || 4000; // backend routing port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
