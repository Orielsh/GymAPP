const userService = require("../services/userService");
const EmailExistError = require("../errors/EmailAlreadyExistError");

const validateUniqueEmail = async (req, res, next) => {
    try{
        const value = req.synthBody;
        if(await userService.isUserWithEmailExist(value.email))
            throw new EmailExistError(value.email);
        return next();
    }catch(error){
        if(error instanceof EmailExistError)
            return res.status(error.status).json({ success: false, message: `Error register: ${error.message}` });
        return res.status(500).json({ success: false, message: "Error register: Email exist. Should return error with status code 409 but something unexpected happen"});
    }
}

module.exports = validateUniqueEmail;