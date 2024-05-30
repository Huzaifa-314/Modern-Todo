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
        trigger.parentElement.querySelector('.update').style.display = 'none';
        trigger.parentElement.querySelector('.edit').style.display = 'block';
        trigger.parentElement.querySelector('.delete').style.display = 'block';
        inputEle = trigger.parentElement.querySelector('.list-name');
        inputEle.readOnly = true;
    }

    function handleInsert(trigger, destParent){
        console.log(destParent);
        sampleTodo = document.querySelector(".sample-todo");
        clonedTodo = sampleTodo.cloneNode(true);
        clonedTodo.classList.remove('d-none');
        clonedTodo.classList.remove('sample-todo');
        clonedTodo.classList.add('row');
        clonedTodo.querySelector('.list-name').value = trigger.value;
        destParent.appendChild(clonedTodo);
        addEvents(clonedTodo);
        trigger.value = '';
        trigger.focus();
    }

    function handleDelete(trigger){

        trigger.parentElement.style.opacity = '0';
        trigger.parentElement.remove();
    }

    todoInput = document.querySelector(".todo-input input");
    todoInput.addEventListener('keypress',function(e){
        if(e.key === 'Enter'){
            handleInsert(this,document.querySelector('.todo-list'));
        }
    });
    

    // todoLists = document.querySelectorAll(".todo-list .row");
    // todoLists.forEach(function(todo){
    //     todoName = todo.querySelector(".list-name");
    //     editBtn = todo.querySelector(".action-button.edit");
    //     DeleteBtn = todo.querySelector(".action-button.delete");
    //     updateBtn = todo.querySelector(".action-button.update");

    //     todoName.addEventListener('dblclick',function(){
    //         handleEdit(this);
    //     });
        
    //     editBtn.addEventListener('click',function(){
    //         handleEdit(this);
    //     });

    //     updateBtn.addEventListener('click',function(){
    //         handleUpdate(this);
    //     });

    //     todoName.addEventListener('keypress',function(e){
    //         if(e.key === 'Enter'){
    //             handleUpdate(this);
    //         }
    //     });



    // });
});

