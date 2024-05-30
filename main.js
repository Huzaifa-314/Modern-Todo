document.addEventListener('DOMContentLoaded', function(){

    function addEvents(todo){
        todoName = todo.querySelector(".list-name");
        editBtn = todo.querySelector(".action-button.edit");
        DeleteBtn = todo.querySelector(".action-button.delete");
        updateBtn = todo.querySelector(".action-button.update");

        todoName.addEventListener('dblclick',function(){
            handleEdit(this);
        });
        
        editBtn.addEventListener('click',function(){
            handleEdit(this);
        });

        updateBtn.addEventListener('click',function(){
            handleUpdate(this);
        });

        todoName.addEventListener('keydown',function(e){
            if(e.key === 'Enter' || e.key === 'Escape'){
                handleUpdate(this);
            }
        });
        
        DeleteBtn.addEventListener('click',function(){
            handleDelete(this);
        });
    }

    function handleEdit(trigger){
        trigger.parentElement.querySelector('.update').style.display = 'block';
        trigger.parentElement.querySelector('.edit').style.display = 'none';
        trigger.parentElement.querySelector('.delete').style.display = 'none';
        inputEle = trigger.parentElement.querySelector('.list-name');
        inputEle.readOnly = false;
        inputEle.focus();
        inputEle.setSelectionRange(0,inputEle.value.length);
    }

    function handleUpdate(trigger){
        if(trigger.value == ''){
            alert("Enter some text or delete it");
            handleEdit(trigger);
            return;
        }
        trigger.parentElement.querySelector('.update').style.display = 'none';
        trigger.parentElement.querySelector('.edit').style.display = 'block';
        trigger.parentElement.querySelector('.delete').style.display = 'block';
        inputEle = trigger.parentElement.querySelector('.list-name');
        inputEle.readOnly = true;

        clonedTodos = JSON.parse(localStorage.getItem('todos'));
        clonedTodos[trigger.parentElement.getAttribute('index')] = inputEle.value;
        localStorage.setItem('todos', JSON.stringify(clonedTodos));
    }

    function createTodo(value,index=''){
        sampleTodo = document.querySelector(".sample-todo");
        clonedTodo = sampleTodo.cloneNode(true);
        clonedTodo.setAttribute('index',index);
        clonedTodo.classList.remove('d-none');
        clonedTodo.classList.remove('sample-todo');
        clonedTodo.classList.add('row');
        clonedTodo.querySelector('.list-name').value = value;
        addEvents(clonedTodo);
        return clonedTodo;
    }

    function handleInsert(trigger, destParent){
        destParent.appendChild(createTodo(trigger.value,JSON.parse(localStorage.getItem('todos')).length));
        trigger.value = '';
        trigger.focus();

        //handle localstorage
        todoArray = localStorage.getItem('todos')?JSON.parse(localStorage.getItem('todos')):[];
        todoArray.push(clonedTodo.querySelector('.list-name').value);
        localStorage.setItem('todos',JSON.stringify(todoArray));
    }

    function handleDelete(trigger){

        trigger.parentElement.style.opacity = '0';
        trigger.parentElement.remove();

        todos = JSON.parse(localStorage.getItem('todos'));
        todos.splice(trigger.parentElement.getAttribute('index'),1);
        localStorage.setItem('todos',JSON.stringify(todos));
    }

    todoList = document.querySelector('.todo-list');
    JSON.parse(localStorage.getItem('todos')).forEach(function(todo,index){
        todoList.appendChild(createTodo(todo,index));
        console.log(index);
    });
    
    

    todoInput = document.querySelector(".todo-input input");
    todoInput.addEventListener('keypress',function(e){
        if(e.key === 'Enter'){
            handleInsert(this,document.querySelector('.todo-list'));
        }
    });
    
});

