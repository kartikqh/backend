
const jwt = require('jsonwebtoken')


const authAdmin= (req, res, next) => {
    try {
        let token = req.headers['authorization']
        if (!token) return res.status(400).json({ msg: "Invalid Authentication." })
        jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Invalid Authentication." })
            req.user = user.id
            if(user.id.userType !=="admin"){
                return res.status(400).json({ error: 'Sorry You are not authorized as you are not admin.' });    
            }
            next()
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = authAdmin
