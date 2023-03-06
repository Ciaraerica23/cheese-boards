const { sequelize } = require('../db')
const {Board} = require('./Board')
const {Cheese} = require('./Cheese')
const {User} = require('./User')

User.hasMany(Board)
Board.belongsTo(User)

const CheeseBoards = sequelize.define('cheeseboards',{})

Board.belongsToMany(Cheese,{through:CheeseBoards})
Cheese.belongsToMany(Board,{through:CheeseBoards})


module.exports = {Board,Cheese,User,CheeseBoards}