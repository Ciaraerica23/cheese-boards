const {sequelize} = require('./db')
const { Board,Cheese,User, CheeseBoards} = require("./Models/index.js");


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

    test('user can have many boards',async ()=>{
        let user3 = await User.create({
            name:'Timmy',
            email:'Timmy123@aol.com'
        });
        let board3 = await Board.create({
            type:'soft',
            description:'arrangement of cheeses',
            rating:4
        });
        let board4 = await Board.create({
            type:'firm',
            description:'arrangement of cheeses',
            rating:5
        });
        await user3.addBoard(board3)
        await user3.addBoard(board4)

        let userWithBoards = await Board.findAll({
            where:{userId: user3.id} 
        });
        expect(userWithBoards[0].type).toBe('soft')
        expect(userWithBoards[0].description).toBe('arrangement of cheeses')
        expect(userWithBoards[0].rating).toBe(4)

        expect(userWithBoards[1].type).toBe('firm')
        expect(userWithBoards[1].description).toBe('arrangement of cheeses')
        expect(userWithBoards[1].rating).toBe(5)

    });

    test('a board can have many cheeses',async()=>{
        let board5 = await Board.create({
            type:'french',
            description:'arrangement of cheeses',
            rating:3
        });
        let cheese3 = await Cheese.create({
            title:'gruere',
            description:'french cheese'
        });
        let cheese4 = await Cheese.create({
            title:'gouda',
            description:'french cheese'
        });
        await board5.addCheese(cheese3)
        await board5.addCheese(cheese4)
        let boardWithCheese = await CheeseBoards.findAll({
            where:{boardId: board5.id}
        });
        expect(boardWithCheese[0].cheeseId).toBe(3)
        expect(boardWithCheese[1].cheeseId).toBe(4)
        
      
        let cheese1 = await Cheese.findByPk(3)
        expect(cheese1.title).toBe('gruere')
        expect(cheese1.description).toBe('french cheese')

        let cheese2 = await Cheese.findByPk(4)
        expect(cheese2.title).toBe('gouda')
        expect(cheese2.description).toBe('french cheese')
    });
    test('a cheese can have many boards',async()=>{
        let cheese5 = await Cheese.create({
            title:'White American',
            description:'American cheese'
        });
        let board6 = await Board.create({
            type:'American',
            description:'arrangement of cheeses',
            rating:2
        });
        let board7 = await Board.create({
            type:'Assortment',
            description:'arrangement of different countries cheeses',
            rating:5
        });
        await cheese5.addBoard(board6)
        await cheese5.addBoard(board7)

        let cheeseWithBoard = await CheeseBoards.findAll({
            where:{cheeseId: cheese5.id}
        });
        expect(cheeseWithBoard[0].boardId).toBe(6)
        expect(cheeseWithBoard[1].boardId).toBe(7)
        
        let board1 = await Board.findByPk(6)
        expect(board1.type).toBe('American')
        expect(board1.description).toBe('arrangement of cheeses')
        expect(board1.rating).toBe(2)

        let board2 = await Board.findByPk(7)
        expect(board2.type).toBe('Assortment')
        expect(board2.description).toBe('arrangement of different countries cheeses')
        expect(board2.rating).toBe(5)
        })

        test("a user can be loaded with it's boards",async ()=>{
            await Board.findAll({
                include: [{
                    model:User, as:'user'
                }]
            })
            let boards = await Board.findByPk(3)
            expect(boards.userId).toBe(3)

            let boards1 = await Board.findByPk(4)
            expect(boards1.userId).toBe(3)
            
        })
    })