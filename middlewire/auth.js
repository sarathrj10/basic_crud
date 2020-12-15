const jwt = require('jsonwebtoken');
const {
    jwt: { secretkey }
} = require('../config');
const db = require('../models');

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            req.flash('error', 'Unauthorised access')
            res.redirect('/');
            return
        }
        const decoded = jwt.verify(token, secretkey);
        if (decoded.exp * 1000 <= Date.now()) {
			req.flash('error', 'Token Expired')
            res.redirect('/');
            return
        }

        const isUserExists = await db.user.findOne({
            where:{
                user_name : decoded.user
            }
        }) 
		if(!isUserExists){
            req.flash('error', 'Invalid Token')
            res.redirect('/');
            return
		}
        req.user = decoded;
        next();
    } catch (e) {
        console.log(e);
    }
}