

const form = document.getElementById('form');
const input = document.getElementById('input');
const todos = document.getElementById('todos');

const todosget = JSON.parse(localStorage.getItem('todos'));

if(todosget){
    todosget.forEach(todo=>{
        addToDo(todo);
    });
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    addToDo();
})

function addToDo(todo){
    let todoText = input.value;

    if(todo){
        todoText = todo.text;
    }

    if(todoText){
        const todoEl = document.createElement('li');

        if(todo && todo.completed){
            todoEl.classList.add("completed");
        }

        todoEl.innerHTML = `${todoText}<i class='far fa-window-close clear'></i>`;
        // todoEl.innerHTML = todoText;

        todos.appendChild(todoEl);

        todoEl.addEventListener('click',()=>{
            todoEl.classList.toggle('completed');
            updateLS();
        });
        const btn = todoEl.querySelector('.clear');
        btn.addEventListener('click',()=>{
            todoEl.remove();
            updateLS();
        });
        // todoEl.addEventListener('contextmenu',()=>{
        //     todoEl.remove();
        //     updateLS();
        // });
        input.value = '';
        updateLS();
    }
}

function updateLS(){
    const todosEl = document.querySelectorAll('li');

    const todos = [];

    todosEl.forEach((todoEl)=>{
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed'),
        });
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}
