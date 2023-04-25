const Notes = require('../models/Notes')
const Todo = require('../models/Todo')

module.exports = {
    getNotes: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})

            const notes = await Notes.find({ userId: req.user.id });

            res.render('todos.ejs', { todos: todoItems, left: itemsLeft, user: req.user, notes: notes });
        }catch(err){
            console.log(err)
        }
    },
    createNote: async (req, res)=>{
        try{
            await Notes.create({note: req.body.note, userId: req.user.id, todoId: req.body.todoId})
            console.log('Note has been added!')
            res.redirect('/notes')
        }catch(err){
            console.log(err)
        }
    },
    deleteNote: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Notes.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Note')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    