const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const showNoteAdd = document.querySelectorAll('.addNote')
const showNote = document.querySelectorAll('.showNote')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

Array.from(showNoteAdd).forEach((el) => {
    el.addEventListener('click', addNotes)
})

Array.from(showNote).forEach((el) =>{
    el.addEventListener('click', showNotes)
})

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function addNotes(){
    const todoId = this.parentNode.dataset.id
    const todo = this.parentNode.children[0].innerText
    let d = document.querySelector('.createNote')
    if (d.classList.contains('hidden')){
        d.classList.replace('hidden', 'shown')
    } else if (d.classList.contains('shown')) {
        d.classList.replace('shown', 'hidden')
    }
    document.getElementsByName('todoId')[0].value = `${todoId}`
    document.getElementsByName('note')[0].placeholder = `Enter note for: ${todo}`
}

async function showNotes(){
    const todoId = this.parentNode.dataset.id
    let d = document.querySelectorAll(`ul [data-id='${todoId}']`)
    Array.from(d).forEach((el) => {
        if (el.classList.contains('notes') && el.classList.contains('hidden')) {
            el.classList.replace('hidden', 'shown')
        } else if (el.classList.contains('shown')) {
            el.classList.replace('shown', 'hidden')
        }
    })    
}
        
    
