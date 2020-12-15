/* jshint indent: 2 */
'use strict'
module.exports = function (sequelize, DataTypes) {
	const book = sequelize.define(
		'book',
		{
            book_id:{
                autoIncrement: true,
                primaryKey:true,
                type: DataTypes.INTEGER
            },
            name:{
                type: DataTypes.STRING,
                allowNull:false
            },
            author:{
                type: DataTypes.STRING,
                allowNull:false
            },
            price:{
                type: DataTypes.INTEGER,
                allowNull:false
            },
		}
	)
	return book;
}