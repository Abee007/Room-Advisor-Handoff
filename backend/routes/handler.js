const express = require("express");
const router = express.Router();
const passport = require("passport");

// APPLICATION ROUTES
// const CLIENT_URL = "https://abrahammensah.com";

//For dev
const CLIENT_URL = "http://localhost:3000";

router.get("/viewreviews", (req, res) => {
  const str = [
    {
      name: "ViewReviews",
      msg: "Test",
    },
  ];
  res.end(JSON.stringify(str));
});

router.post("/addFavorite", (req, res) => {
  res.end("NA");
});

/// /////////////////////////

// CAS AUTHENTICATION ROUTE

/// //////////////////////////

router.get("/auth/login/success", (req, res) => {
  console.log("login success?");
  if (req.user) {
    return res.status(200).json({
      success: true,
      message: "Successfully logged in with CAS",
      user: req.user,
      cookies: req.cookies,
    });
  }
  return res.status(200).json({
    success: false,
    message: "Failed to Login with CAS",
  });
});

router.get("/auth/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed to Login with CAS",
  });
});

router.get("/auth/cas/logout", (req, res) => {
  console.log("here in logout");
  req.logout();
  res.redirect("http://localhost:3000/logout");
});

router.get(
  "/auth/cas",
  passport.authenticate("cas", { failureRedirect: "/auth/login/failed" }),
  function (req, res) {
    // Successful authentication, redirect check if user is valid.

    // INSTEAD OF JUST REDIRECTING, SET USER NETID ON A COOKIE
    // RETRIEVE THE COOKIE FROM /auth/login/success
    console.log("redirect to check user validity");
    res.redirect(`${CLIENT_URL}/viewreviews`);
  }
);

module.exports = router;
