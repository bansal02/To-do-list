let todoItems = [];
let id = 1;

// Fetch to-do items from API
fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch to-do items');
    }
    return response.json();
  })
  .then(data => {
    data.forEach((item)=>{
        var todoItem = {
            text: item.title,
            id: item.id
        };
        id++;
        todoItems.push(todoItem);
    })
    renderTodoItems()
  })
  .catch(error => {
    console.log('Error fetching to-do items:', error);
  });

document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var todoInput = document.getElementById('todo-input');
    var todoText = todoInput.value.trim();

    if (todoText !== '') {
        var todoItem = {
            text: todoText,
            id: id
        };
        id++;
        todoItems.push(todoItem);
        renderTodoItems();
        todoInput.value = '';
    }
});

function renderTodoItems() {
    var todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todoItems.forEach(function(todoItem, index) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `<span class="item-number"> ID: ${todoItem.id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>${todoItem.text}`;
        

        var deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'delete-btn';

        deleteButton.addEventListener('click', function() {
            todoItems.splice(index, 1);
            renderTodoItems();
        });

        listItem.appendChild(deleteButton);
        
        todoList.appendChild(listItem);
    });
}
