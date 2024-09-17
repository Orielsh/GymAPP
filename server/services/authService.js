const InvalidCredentialsError = require("../errors/InvalidCredentialsError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
const userDAL = require("../dal/user.dal");

async function login(credentials) {
    try {
        const user = await userDAL.getUserByEmail(credentials.email);
        if (!user) throw new InvalidCredentialsError();
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) throw new InvalidCredentialsError();
        const token = jwt.sign({    //maybe delegate to new util file or ..
            id: user._id,
            role: user.role,
        }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        return token
    } catch (error) {
        throw error
    }
}

// register a new user
async function register(userDetails) {
    try {
        // hash the password
        // replace the plain-text password we received from the user, by its hashed version
        userDetails.password = await bcrypt.hash(userDetails.password, 10);

        userDetails.role = "TRAINEE";

        // save the new user to the database
        const saved = await userDAL.createUser(userDetails)
        return saved;
    } catch (error) {
        throw error;
    }
}

module.exports = { login, register };