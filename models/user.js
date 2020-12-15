/* jshint indent: 2 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    jwt: {secretkey},
} = require('../config');
'use strict'
module.exports = function (sequelize, DataTypes) {
	const user = sequelize.define(
		'user',
		{
            user_id:{
                autoIncrement: true,
                primaryKey:true,
                type: DataTypes.INTEGER
            },
            user_name:{
                type: DataTypes.STRING,
                allowNull:false
            },
            password:{
                type: DataTypes.STRING,
                allowNull:false
            },
            salt:{
                type: DataTypes.STRING,
                allowNull:false
            },
		}
    )

    user.generateSalt = async function () {
        return await bcrypt.genSalt()
    };

    user.hashPassword = async function (pass,salt) {
        return await bcrypt.hash(pass, salt)
    };

    user.verifyPassword = async function (pass, hash, salt) {
        const hashPassword = await bcrypt.hash(pass, salt)
        if(hashPassword == hash) return true;
        else return false;
    };

    user.generateAuthToken = function (data) {
        let expiresIn = expireIn(1);
        //if (rememberMe) expiresIn = expireIn(30)
        return jwt.sign(
            {
                id: data.id,
                user : data.username,
            },
            secretkey,
            {expiresIn}
        )
    };

    const expireIn = numDays => {
        const dateObj = new Date();
        return dateObj.setDate(dateObj.getDate() + numDays);
    };

	return user;
}