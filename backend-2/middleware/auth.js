
const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
    try {
        let token = req.headers['authorization']
        console.log(req.headers)
        console.log(token)
        if (!token) return res.status(400).json({ msg: "Invalid Authentication." })
        jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Invalid Authentication." })
            req.user = user.id
            if (user.id.userType != "driver"){
                return res.status(400).json({ error: 'Sorry You are not authorized as you are not driver.' }); 
              }
            next()
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = auth