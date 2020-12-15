const db = require('../models')

module.exports = {
    showAddBook: async (req, res) => {
        res.render('addBook');
    },
    createBook: async (req, res) => {
        try{
            let {bookName,author,price} = req.body;
            const data = await db.book.create({
                name: bookName,
                author,
                price
            })
            req.flash('success', 'Book successfully added');
            res.redirect('/books');
        }catch(err){
            console.log(err);
            req.flash('error', 'something went wrong');
            res.redirect('/books');
        }
    },
    showDash : async(req,res) => {
        try{
            const data = await db.book.findAll({ })
            res.render('dashboard',{data})
        }catch(e){
            console.log(err);
            req.flash('error', err);
        }
    },
    editBook : async(req,res) => {
        try{
            let book_id = req.params.id;
            const data = await db.book.findOne({
                where:{
                    book_id
                }
             })
             res.render('editBook',{data : data.dataValues})
        }catch(e){
            console.log(err);
            req.flash('error', err);
        }
    },
    editBooks : async(req,res) => {
        try{
            let {book_id,bookName,author,price} = req.body;
             await db.book.update({
                name: bookName,
                author,
                price
            },{
                where : {
                    book_id
                }
            })
            req.flash('success', 'Book successfully updated');
            res.redirect('/books');
        }catch(e){
            console.log(err);
            req.flash('error', 'something went wrong');
            res.redirect('/books');
        }
    },
    deleteBook : async(req,res) => {
        try{
            let book_id = req.params.id;
            await db.book.destroy({
                where:{
                    book_id
                },
                force : true
             })
             req.flash('success', 'Book successfully deleted');
             res.redirect('/books');

        }catch(e){
            console.log(err);
            req.flash('error', 'something went wrong');
            res.redirect('/books');
        }
    }
}