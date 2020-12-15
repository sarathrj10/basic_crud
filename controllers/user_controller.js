const db = require('../models')

module.exports = {
    showLogin : async (req,res) => {
        res.render('login');
    },
    postLogin: async(req,res) => {
        try{
            const{username,password} = req.body;
            const ifExists = await db.user.findOne({
                where:{
                    user_name : username
                }
            })
            if(!ifExists){
                req.flash('error','invalid username or password')
                res.redirect('/');
            }

            const validatePassword = await db.user.verifyPassword(password,ifExists.password,ifExists.salt);

            if(!validatePassword){
                req.flash('error','invalid username or password')
                res.redirect('/');
            }

            const accessToken = db.user.generateAuthToken({id:ifExists.user_id, username :ifExists.user_name});

            res.cookie('access_token', accessToken,{
                httpOnly : true
            })
            res.redirect('/books')

        }catch(e){
            console.log(e);
        }
    },
    logout: async(req,res) => {
        try{
            res.clearCookie("access_token")
            res.redirect('/');
        }catch(e){
            console.log(e);
        }
    }
}