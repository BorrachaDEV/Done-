// Horário
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

function newTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    hoursElement.textContent = fixTime(hours);
    minutesElement.textContent = fixTime(minutes);
    secondsElement.textContent = fixTime(seconds);
}

function fixTime(time) {
    return time < 10 ? '0' + time : time;
}

newTime();
setInterval(newTime, 1000);

// To-do-list
const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoListUL = document.getElementById('todo-list');
const todoTimeInput = document.getElementById('todo-time');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
});

function getTodos() {
    const todosJSON = localStorage.getItem('todos');
    try {
        return todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e) {
        console.error('Error parsing todos from localStorage', e);
        return [];
    }
}


function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(allTodos));
}

function addTodo(){
    const todoText = todoInput.value.trim();
    const todoTime = todoTimeInput.value;
    if(todoText.length > 0){
        allTodos.push({text: todoText, time: todoTime, completed: false});
        saveTodos();
        updateTodoList();
        todoInput.value = "";
        todoTimeInput.value = "";
    }
}

function createTodoItem(todo, todoindex){
    const todoId = "todo-" + todoindex;
    const todoLI = document.createElement("li");
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}" ${todo.completed ? 'checked' : ''}> <!-- Defina o estado checked com base na propriedade 'completed' -->
        <label class="custom-checkbox" for="${todoId}"></label>
        <label for="${todoId}" class="todo-text">${todo.text} - ${todo.time}</label>
        <button class="delete-button">
            <svg fill="var(--color-white)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>`;
    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoindex);
    })
    const checkbox = todoLI.querySelector("input[type='checkbox']");
    checkbox.addEventListener('change', () => {
        allTodos[todoindex].completed = checkbox.checked; 
        saveTodos();
    });
    return todoLI;
}
function deleteTodoItem(todoindex){
    allTodos = allTodos.filter((_, i)=> i !== todoindex);
    saveTodos()
    updateTodoList();
}

function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoindex) => {
        const todoItem = createTodoItem(todo, todoindex);
        todoListUL.append(todoItem);
    });
}
