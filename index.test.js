const {sequelize} = require('./db')
const { Board,Cheese,User} = require("./Models/index.js");


describe('test for Board,Cheese,and User',()=>{

    beforeAll(async () => {
  
        await sequelize.sync({ force: true });
    });

    test('can create a Board', async () => {
        let board1= await Board.create({
            type:'soft',
            description:'arrangement of soft cheeses',
            rating:4
        });
        expect(board1.type).toBe('soft')
        expect(board1.description).toBe('arrangement of soft cheeses')
        expect(board1.rating).toBe(4)
    });

    test('can create a Cheese',async () =>{
        let cheese1 = await Cheese.create({
            title:'brie',
            description:'spreadable cheese'
        });
        expect(cheese1.title).toBe('brie')
        expect(cheese1.description).toBe('spreadable cheese')
    });
     
    test('can create a User', async () =>{
        let user1 = await User.create({
            name:'Ciara',
            email:'ces1234@gmail.com'
        });
        expect(user1.name).toBe('Ciara')
        expect(user1.email).toBe('ces1234@gmail.com')
    });

    test('can find Board', async ()=>{
        let foundBoard = await Board.findByPk(1)
        expect(foundBoard.type).toBe('soft')
    });

    test('can find Cheese', async ()=>{
        let foundCheese = await Cheese.findByPk(1)
        expect(foundCheese.title).toBe('brie')
    });

    test('can find User', async ()=>{
        let foundUser = await User.findByPk(1)
        expect(foundUser.name).toBe('Ciara')
    });

    test('can update Board', async ()=>{
        let foundBoard = await Board.findByPk(1)
        await foundBoard.update({
            type:'firm'
        });
        expect(foundBoard.type).toBe('firm')
    });

    test('can update Cheese', async ()=>{
        let foundCheese = await Cheese.findByPk(1)
        await foundCheese.update({
            title:'chevre'
        });
        expect(foundCheese.title).toBe('chevre')
    });

    test('can update User', async ()=>{
        let foundUser = await User.findByPk(1)
        await foundUser.update({
            name:'Anais'
        })
        expect(foundUser.name).toBe('Anais')
    });

    test('can delete Board', async()=>{
        let board2 = await Board.create({
            type:'soft',
            description:'arrangement of cheeses',
            rating:4
        });
        await board2.destroy()
        expect(Board.findByPk(2).type).toBe(undefined)
    });

    test('can delete Cheese', async()=>{
        let cheese2 = await Cheese.create({
            title:'brie',
            description:'spreadable cheese'
        });
        await cheese2.destroy()
        expect(Cheese.findByPk(2).title).toBe(undefined)
    });

    test('can delete User', async()=>{
        let user2 = await User.create({
            name:'Ciara',
            email:'cstaff@gmail.com'
        });
        await user2.destroy()
        expect(User.findByPk(2).name).toBe(undefined)
    })
























})