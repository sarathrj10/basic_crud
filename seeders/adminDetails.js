'use strict'
const bcrypt = require('bcrypt')
const db = require('../models')

//seeding admin data
;(async () => {
    try{

        const salt = await db.user.generateSalt();
        const password = await db.user.hashPassword('admin',salt);

        await db.user.create({
            user_name : 'admin',
            password,
            salt
        })

        console.log('Admin user successfully seeded');

        process.exit(0)

    }catch(e){
        console.log(e);
    }
})()