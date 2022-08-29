
// Middleware to verify the token

// Verify Token

const verifyToken = (req, res, next) => {
    // Get Auth Header Value 
    const bearerHeader = req.headers['authorization'];

    // Check if Undefined
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;

        // Next => Continue 
        next();
    } else {
        res
            .status(403)
            .json({
                message: 'Authorization token not found!'
            });
    }
} 

module.exports = verifyToken;