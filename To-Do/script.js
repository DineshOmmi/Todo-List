window.addEventListener('load',() => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameinput = document.querySelector('#name');
    const todolist = document.querySelector('#todo-list');
    const newtodoform = document.querySelector('#new-todo-form');


    const username = localStorage.getItem('username') || '';
    nameinput.value = username;

    nameinput.addEventListener('change',event =>{
        localStorage.setItem('username',event.target.value);
    })

    newtodoform.addEventListener('submit',event => {
        event.preventDefault();
        
        const todo ={
            content : event.target.elements.content.value,
            category : event.target.elements.category.value,
            done : false,
            createAt : new Date().getTime(),
        }

        todos.push(todo);
        localStorage.setItem('todos',JSON.stringify(todos));
        event.target.reset();
        DisplayTodos();
    })
    DisplayTodos();
})

function DisplayTodos(){
    const todolist = document.querySelector('#todo-list');
    todolist.innerHTML = '';
    todos.forEach(todo => {
        const todoitem = document.createElement('div');
        todoitem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const action = document.createElement('div');
        const edit = document.createElement('button');
        const deletebtn = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        if (todo.category == 'personal'){
            span.classList.add('personal');
        }else{
            span.classList.add('business');
        }
        
        content.classList.add('todo-content');
        action.classList.add('action');
        edit.classList.add('edit');
        deletebtn.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly >`;
        edit.innerHTML = 'Edit';
        deletebtn.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        action.appendChild(edit);
        action.appendChild(deletebtn);
        todoitem.appendChild(label);
        todoitem.appendChild(content);
        todoitem.appendChild(action);

        todolist.appendChild(todoitem);

        if(todo.done) {
            todoitem.classList.add('done');
        }

        input.addEventListener('click',event => {
            todo.done = event.target.checked;
            localStorage.setItem('todos',JSON.stringify(todos));
            if(todo.done) {
                todoitem.classList.add('done');
            }else{
                todoitem.classList.remove('done');
            }

            DisplayTodos();
        })
        edit.addEventListener('click',event => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur',event => {
                input.setAttribute('readonly',true);
                todo.content = event.target.value;
                localStorage.setItem('todos',JSON.stringify(todos));
                DisplayTodos();
            })
        })
        deletebtn.addEventListener('click',event => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos',JSON.stringify(todos));
            DisplayTodos();
        })
    });
}