
const passport = require("passport");
const isBeta = process.env.NODE_ENV === "beta";
const isProduction = process.env.NODE_ENV === "production" || isBeta;
var CLIENT_URL = "http://localhost:3000";
if (isProduction) {
    if (isBeta) {
        CLIENT_URL = "https://beta.roomadvisor.org";
    } else {
        CLIENT_URL = "https://roomadvisor.org";
    }
}

exports.loginSuccess = function (request, result) {
    console.log("login success?");
    if (request.user) {
        return result.status(200).json({
            success: true,
            message: "Successfully logged in with CAS",
            user: request.user,
            cookies: request.cookies,
        });
    }
    return result.status(200).json({
        success: false,
        message: "Failed to Login with CAS",
    });
}

exports.loginFailed = function (request, result) {
    result.status(401).json({
        success: false,
        message: "Failed to Login with CAS",
    });
}

exports.logout = function (request, result) {
    console.log("here in logout");
    request.logout();
    result.redirect("http://localhost:3000/logout"); // what...?
}

exports.cas = function (request, result) {
    passport.authenticate("cas", { failureRedirect: "/auth/login/failed" },
    function (request, result) {
        // Successful authentication, redirect check if user is valid.

        // INSTEAD OF JUST REDIRECTING, SET USER NETID ON A COOKIE
        // RETRIEVE THE COOKIE FROM /auth/login/success
        console.log("redirect to check user validity");
        res.redirect(`${CLIENT_URL}/viewreviews`);
    });
}