const setTokenCookie = (res, token) => {

    res.cookie("token", token, {
        httpOnly: true,        // cannot access via JS (security)
        secure: false,         // set true in production (HTTPS)
        sameSite: "strict",    // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

};

module.exports = setTokenCookie;