const todoBtn = document.querySelector('.todo_btn');
const todoInput = document.querySelector('.todo_input');
const todoList = document.querySelector('.todo_list')
const filterOption = document.querySelector('.filter_todo')
const clearBtn = document.querySelector('.clear_btn')

document.addEventListener('DOMContentLoaded', getTodos)
todoBtn.addEventListener('click', addNewTask);
todoList.addEventListener('click', deleteCheckItem);
filterOption.addEventListener('click', filterTodo);
clearBtn.addEventListener('click', clearAll)


function addNewTask(event) {
    // Отменяем действие кнопки по умолчанию
    event.preventDefault()
    if(todoInput.value === '') {
        alert('Сначала добавьте задачу')
    } else {
        // Создаем divItem
    const divItem = document.createElement('div')
    divItem.classList.add('todo')
    // Создаем Li
    const liItem = document.createElement('li')
    liItem.textContent = todoInput.value
    liItem.classList.add('todo_li')
    divItem.append(liItem)
    saveLocalStorage(todoInput.value)
    // Создаем кнопку checked
    const checkBtn = document.createElement('button')
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    checkBtn.classList.add('todo_btn_check')
    divItem.append(checkBtn)
    // Создаем кнопку удалить
    const trashBtn = document.createElement('button')
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('todo_btn_trash')
    divItem.append(trashBtn)
    // Добавляем divItem в todoList
    todoList.appendChild(divItem)
    // Очищаем input
    todoInput.value = '';
    }
}

function deleteCheckItem(event) {
    const target = event.target
    if(target.className === 'todo_btn_trash') {
        const parentEl = target.parentElement;
        parentEl.classList.add('fall')
        parentEl.addEventListener('transitionend', () => parentEl.remove())
        removeLocalStorage(parentEl)   
    };
    if(target.className === 'todo_btn_check') {
        const parentEl = target.parentElement;
        parentEl.classList.toggle('completed')
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch(e.target.value) {
            case 'all': 
                todo.style.display = 'flex'
                break;
            case 'completed':
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
        }
    })
}

function saveLocalStorage(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach((todo) => {
        // Создаем divItem
        const divItem = document.createElement('div')
        divItem.classList.add('todo')
        // Создаем Li
        const liItem = document.createElement('li')
        liItem.textContent = todo
        liItem.classList.add('todo_li')
        divItem.append(liItem)
        // Создаем кнопку checked
        const checkBtn = document.createElement('button')
        checkBtn.innerHTML = '<i class="fas fa-check"></i>';
        checkBtn.classList.add('todo_btn_check')
        divItem.append(checkBtn)
        // Создаем кнопку удалить
        const trashBtn = document.createElement('button')
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add('todo_btn_trash')
        divItem.append(trashBtn)
        // Добавляем divItem в todoList
        todoList.appendChild(divItem)
    })
}

function removeLocalStorage(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    
    const todoIndex = todo.children[0].textContent
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function clearAll(e) {
    e.preventDefault()
    const todoItems = todoList.children
    for (let i = 0; i < todoItems.length; i ++ ) {
        todoItems[i].style.display = 'none' 
    }
    localStorage.clear()
}