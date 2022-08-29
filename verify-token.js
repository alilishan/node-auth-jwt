

// Verify Token
const verifyToken = (req, res, next) => {
    // Get Auth Header Value 
    const bearerHeader = req.headers['authorzation'];

    // Check if Undefined
    if (typeof bearerHeader !== 'undefined') {

    } else {
        res
            .json({
                message: 'Forbidden'
            })
            .sendStatus(403);
    }
} 

exports.verifyToken = verifyToken;