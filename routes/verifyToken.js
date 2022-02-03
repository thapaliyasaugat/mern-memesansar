const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.token
        if (token) {
            jwt.verify(token, process.env.SECRET, (error, userDetail) => {
                error && res.status(401).json('token is not valid')
                req.user = userDetail
                next()
            })

        } else {
            res.status(400).json('unauthorized')
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).json('server error')
    }
}

module.exports = verifyToken
