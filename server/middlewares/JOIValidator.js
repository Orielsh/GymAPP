const JOIValidationError = require("../errors/JOIValidationError");
const parseJOIErrors = require("../utils/joiErrorParser")

const validateScheme = (scheme) => {
    return (req, res, next) => {
        try{
            const {error, value} = scheme.validate(req.body);
            if (error)
                throw new JOIValidationError(parseJOIErrors(error))
            req.synthBody = value;
            req.body = undefined;
            return next();
        }catch (err) {
            if (err instanceof JOIValidationError)
                return res.status(err.status).json({ success: false, message: `Missing data: ${err.message}` })
            console.log(err.message);
            return res.status(500).json({ success: false, message: "Should return error with status code 400, Something went wrong with scheme validation." })
        }
    }
}

module.exports = validateScheme;