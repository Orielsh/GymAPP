const LoginError = require("../errors/logInError");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const isLoggedIn = (req, res, next) => {
    try {
        const token = req.header('x-auth-token')
        if (!token) throw new LoginError();
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        return next();
    } catch (err) {
        if (err instanceof LoginError)
            return res.status(err.status).json({ success: false, message: err.message })
        return res.status(500).json({ success: false, message: err.message })
    }
}

const isAdminOrTrainer = (req, res, next) => {
    if (req.user.role === "ADMIN" || req.user.role === "TRAINER")
        return next();
    else
        return res.status(403).json({ success: false, message: "Access denied" })
}

const isAdmin = (req, res, next) => {
    if (req.user.role === "ADMIN")
        return next();
    else
        return res.status(403).json({ success: false, message: "Access denied" })
}

const isCurrentUserOrAdmin = (req, res, next) => {
    if (req.params.id === req.user.id || req.user.role === "ADMIN")
        return next();
    else
        return res.status(403).json({ success: false, message: "Access denied" })
}


const canViewAllUsers = (req, res, next) => {
    if (req.params.id === req.user.id || req.user.role === "ADMIN" || req.user.role === "TRAINER")
        return next();
    else
        return res.status(403).json({ success: false, message: "Access denied" })
}

const isCurrentUser = (req, res, next) => {
    if (req.params.id === req.user.id)
        return next();
    else
        return res.status(403).json({ success: false, message: "Access denied" })
}

module.exports = {
    isLoggedIn,
    isCurrentUserOrAdmin,
    isAdminOrTrainer,
    isCurrentUser,
    canViewAllUsers,
    isAdmin,
};