// let user = 'Zarina'
// localStorage.setItem('student',user)
// localStorage.setItem('student2', 'Taalai')
// localStorage.setItem('student3', 'Aruun')
// localStorage.setItem('student4', 'Duulat')


// console.log(localStorage.getItem('student'));
// localStorage.removeItem('student')
// localStorage.clear()

// let arr = []
// for (let i = 0; i<5; i++){
//     let a = prompt('enter')
//     arr.push(a)
// }
// localStorage.setItem('work',arr)
// let b = localStorage.getItem('work')
// console.log(b)


// ==============JSON================
// JSON = текстовый формат обмена данными, 
// основанный на JavaScript
// let obj = {
//     'bootcamp':'ITC'
// }
// let translate = JSON.stringify(obj) // превращает объект в текст
// alert(translate)
// translate= JSON.parse(translate)   // превращает текст в объект 
// console.log(translate)

// ===============TODO-LIST=========

let imgDone,imgCorreect,imgTrash
imgDone = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">

    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />

    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />

</svg>`

imgCorrect = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">

    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />

    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />

</svg>`


imgTrash = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">

    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />

    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />

</svg>`


let tasks =[]
let output = document.getElementById('output')

const AddToDo =()=>{
    let input = document.getElementById('input')
    const todo ={
        id: tasks.length +1,
        name: input.value,
        completed: false 
    }
    tasks.push(todo)
    addToLocalStorage()
    input.value =''
}

const renderToDo =()=>{
    output.innerHTML=''
    tasks.forEach((el, index)=>{
        let card = document.createElement('div')
        card.className='card'
        let h = document.createElement('h3')
        let btns = document.createElement('div')
        btns.className='buttons'
        let done = document.createElement('button')
        let correct = document.createElement('button')
        let trash = document.createElement('button')
        card.className = el.completed == true ? 'active' : 'card'
        h.innerHTML = el.name
        done.innerHTML = imgDone
        correct.innerHTML = imgCorrect
        trash.innerHTML=imgTrash
        output.append(card)
        card.append(h,btns)
        btns.append(correct, trash, done)
        

        let id = el.id
        done.addEventListener('click', ()=>{
            tasks.forEach(el=>{
                if(el.id == id){
                    el.completed = !el.completed
                }
            })
            addToLocalStorage()
        })

        trash.addEventListener('click', ()=>{
            let conf = confirm('Do you really want to delete this task?')
            if(conf){
                tasks = tasks.filter(el=>el.id != id)
            }
            addToLocalStorage()
        })

        correct.addEventListener('click',()=>{
            let conf = prompt('edit your task')
            tasks.forEach(el=>{
                if(el.id == id){
                    let p =  confirm('do you really want to edit this task?')
                    if(p){
                        el.name = conf
                    }
                }
                addToLocalStorage()
            })
        })
    })
}
const addToLocalStorage =()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
    console.log(renderToDo)
    renderToDo()
}
const getFromLocalStorage=()=>{
    const reference = localStorage.getItem('tasks')
    if(reference){
        tasks = JSON.parse(reference)
        renderToDo()
    }
}
getFromLocalStorage()

// style======
const body = document.querySelector('.background')
body.style.cssText=`
background-color:rgb(60, 92, 60);
`

const h1=document.querySelector('.text1')
h1.style.cssText=`
color:rgba(29, 28, 25, 0.849);
font-size:60px;
position:absolute;
right:605px;
top:1px;
`
const btn = document.querySelector('#input')
btn.style.cssText=`
width: 600px;
height: 50px;
font-size: 18px;
margin-left:370px;
margin-top:150px;
`
const btn2= document.querySelector('#btn')
btn2.style.cssText=`
height: 56px;
width: 100px;
background-color:rgba(109, 105, 93, 0.849);
color: lightcyan;
`
