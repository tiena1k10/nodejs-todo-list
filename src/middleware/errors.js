const { CustomAPIError } = require("../middleware/custom-error")

const handleError = (err, req, res, next) => {
    // check error is my custom error
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res.status(500).json({ msg: "something went wrong, try again later" });
}

module.exports = handleError;