
// check there is no one will edit data, just admin and user who owns the data
const checkAdmin = (req, res, next) => {
    if( req.user.id === req.params.id || req.user.isAdmin ) {
        next()
    } else {
        res.status(403)
        throw new Error('You are not allowed to this route')
    }
}

// check if that admin 
const onlyAdmin = (req, res, next ) => {
    if(req.user.isAdmin) {
        next()
    } else {
        res.status(403)
        throw new Error('You are not allowed this route, just admin can be.')
    }
}

module.exports = {
    checkAdmin,
    onlyAdmin
}

