//horario section
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
// horario 

//to-do-list
const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = [];

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
});

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        allTodos.push(todoText);
        updateTodoList(); // Chame a função para atualizar a lista
        todoInput.value = "";
    }
}

function createTodoItem(todo, todoindex){
    const todoId = "todo-" + todoindex;
    const todoLI = document.createElement("li");
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}"></label> <!-- Correção aqui -->
        <label for="${todoId}" class="todo-text">${todo}</label>
        <button class="delete-button">
            <svg fill="var(--color-white)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>`;
    return todoLI;
}

function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoindex) => { // Correção aqui
        const todoItem = createTodoItem(todo, todoindex);
        todoListUL.append(todoItem);
    });
}
