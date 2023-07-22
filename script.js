const todoList = JSON.parse(localStorage.getItem('todoList')) || [];



function saveToLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function renderTodoList() {
  let idd=1;
  const todoListElement = document.getElementById('todoList');
  todoListElement.innerHTML = '';
  for (const todo of todoList) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <span style="font-size :25px; padding-top: 50px">${idd}. </span>
          <input type="checkbox" class="form-check-input largerCheckbox" onchange="toggleDone(${todo.id})" ${todo.done ? 'checked' : ''}>
          <span style="font-size :25px">Task: </span>&nbsp;<span style="font-size :25px">${todo.text}</span>
          <button onclick="editTodo(${todo.id})" class="btn btn-sm btn-primary mr-2">Edit</button>
          <button onclick="deleteTodo(${todo.id})" class="btn btn-sm btn-danger">Delete</button>
        </div>
          <ul id="subtasks-${todo.id}">
          ${renderSubtasks(todo.subtasks)}
        </ul>
        <div>
      <span style="line-height: 8px">&nbsp;</span></div>
        <div class="subtask-input" id="subtaskInput-${todo.id}">
          <input type="text" id="newSubtask-${todo.id}" placeholder="Add a subtask">
          <button onclick="addSubtask(${todo.id})">Save</button>
        </div>
        <button onclick="toggleSubtaskInput(${todo.id})">Add Subtask</button>
      </div>
      <div>
      <span style="line-height: 8px">&nbsp;</span></div>
      <div class="tags mt-2">
        <span style="font-size :15px" class="label label-primary">Category:  ${todo.category}&nbsp;&nbsp;&nbsp; Tag:  ${todo.tags}</span>
      </div>
      <small style="font-size :12px" class="text-muted">&nbsp;&nbsp;Task Period: ${todo.startDate ? new Date(todo.startDate).toLocaleDateString() : 'NULL'} to  ${todo.lastDate ? new Date(todo.lastDate).toLocaleDateString() : 'NULL'}&nbsp;&nbsp; Priority: ${todo.priority} </small>
      <div>
      <span style="line-height: 20px">&nbsp;</span></div>
    `;
    todoListElement.appendChild(li);
    idd++;
  }
}

function renderSubtasks(subtasks) {
  return subtasks.map((subtask, index) => `
    <li>
     <div>
     <span style="line-height: 10px">&nbsp;</span></div>
      &emsp;&emsp;&emsp;&emsp;
      <input type="checkbox" onchange="toggleSubtaskDone(${index})" ${subtask.done ? 'checked' : ''}>
      <span>${subtask.text}</span>
      <button onclick="editSubtask(${index})">Edit</button>
      <button onclick="deleteSubtask(${index})">Delete</button>
    </li>
  `).join('');
}

function activetask(){
  let idd=1;
  const currentDate = new Date().getTime();
  const activetask = todoList.filter(todo => todo.lastDate && new Date(todo.lastDate).getTime() >= currentDate && new Date(todo.startDate).getTime() <= currentDate);
  const todoListElement = document.getElementById('todoList');
  todoListElement.innerHTML = '';

  for (const todo of activetask) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <span style="font-size :25px; padding-top: 50px">${idd}. </span>
          <input type="checkbox" class="form-check-input largerCheckbox" onchange="toggleDone(${todo.id})" ${todo.done ? 'checked' : ''}>
          <span style="font-size :25px">Task: </span>&nbsp;<span style="font-size :25px">${todo.text}</span>
          <button onclick="editTodo(${todo.id})" class="btn btn-sm btn-primary mr-2">Edit</button>
          <button onclick="deleteTodo(${todo.id})" class="btn btn-sm btn-danger">Delete</button>
        </div>
          <ul id="subtasks-${todo.id}">
          ${renderSubtasks(todo.subtasks)}
        </ul>
        <div>
      <span style="line-height: 8px">&nbsp;</span></div>
        <div class="subtask-input" id="subtaskInput-${todo.id}">
          <input type="text" id="newSubtask-${todo.id}" placeholder="Add a subtask">
          <button onclick="addSubtask(${todo.id})">Add Subtask</button>
        </div>
        <button onclick="toggleSubtaskInput(${todo.id})">Add Subtask</button>
      </div>
      <div>
      <span style="line-height: 8px">&nbsp;</span></div>
      <div class="tags mt-2">
        <span style="font-size :15px" class="label label-primary">Category:  ${todo.category}</span>
      </div>
      <small style="font-size :12px" class="text-muted">&nbsp;&nbsp;Task Period: ${todo.startDate ? new Date(todo.startDate).toLocaleDateString() : 'NULL'} to  ${todo.lastDate ? new Date(todo.lastDate).toLocaleDateString() : 'NULL'}&nbsp;&nbsp; Priority: ${todo.priority} </small>
      <div>
      <span style="line-height: 20px">&nbsp;</span></div>
    `;
    todoListElement.appendChild(li);
    idd++;
  }
}

function backlogs(){
  let idd=1;
  const currentDate = new Date().getTime();
  const backlogs = todoList.filter(todo => todo.lastDate && new Date(todo.lastDate).getTime() < currentDate);
  const todoListElement = document.getElementById('todoList');
  todoListElement.innerHTML = '';

  for (const todo of backlogs) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <span style="font-size :25px; padding-top: 50px">${idd}. </span>
          <input type="checkbox" class="form-check-input largerCheckbox" onchange="toggleDone(${todo.id})" ${todo.done ? 'checked' : ''}>
          <span style="font-size :25px">Task: </span>&nbsp;<span style="font-size :25px">${todo.text}</span>
          <button onclick="editTodo(${todo.id})" class="btn btn-sm btn-primary mr-2">Edit</button>
          <button onclick="deleteTodo(${todo.id})" class="btn btn-sm btn-danger">Delete</button>
        </div>
          <ul id="subtasks-${todo.id}">
          ${renderSubtasks(todo.subtasks)}
        </ul>
        <div>
      <span style="line-height: 8px">&nbsp;</span></div>
        <div class="subtask-input" id="subtaskInput-${todo.id}">
          <input type="text" id="newSubtask-${todo.id}" placeholder="Add a subtask">
          <button onclick="addSubtask(${todo.id})">Add Subtask</button>
        </div>
        <button onclick="toggleSubtaskInput(${todo.id})">Add Subtask</button>
      </div>
      <div>
      <span style="line-height: 8px">&nbsp;</span></div>
      <div class="tags mt-2">
        <span style="font-size :15px" class="label label-primary">Category:  ${todo.category}</span>
      </div>
      <small style="font-size :12px" class="text-muted">&nbsp;&nbsp;Task Period: ${todo.startDate ? new Date(todo.startDate).toLocaleDateString() : 'NULL'} to  ${todo.lastDate ? new Date(todo.lastDate).toLocaleDateString() : 'NULL'}&nbsp;&nbsp; Priority: ${todo.priority} </small>
      <div>
      <span style="line-height: 20px">&nbsp;</span></div>
    `;
    todoListElement.appendChild(li);
    idd++;
  }
}

function alltask(){
  renderTodoList();
}

function addTodo() {
  const newTodoInput = document.getElementById('newTodo');
  const todoText = newTodoInput.value.trim();
  const category = document.getElementById('category');
  const categoryText = category.options[category.selectedIndex].text;
  const priority = document.getElementById('priority');
  const priorityText = priority.options[priority.selectedIndex].text;
  const startDate = document.getElementById('startDate').value;
  const lastDate = document.getElementById('lastDate').value;
  const tagInput = document.getElementById('tag');
  const tagText = tagInput.value.trim();

  if (todoText !== '') {
    const newTodo = {
      id: Date.now(),
      text: todoText,
      category: categoryText,
      tags: tagText,
      startDate: startDate || null,
      lastDate: lastDate || null,
      priority: priorityText,
      subtasks: [],
      done: false,
    };
    console.log(newTodo);
    todoList.push(newTodo);
    console.log(todoList);
    saveToLocalStorage();
    renderTodoList();
    newTodoInput.value = '';
    tagInput.value = '';
    startDate.value = '';
    lastDate.value = '';
    priority.selectedIndex = 'Select Priority';
    category.selectedIndex = 'Select Category';
  }
}

function toggleDone(todoId) {
  const todo = todoList.find(todo => todo.id === todoId);
  if (todo) {
    todo.done = !todo.done;
    saveToLocalStorage();
    renderTodoList();
  }
}

function editTodo(todoId) {
  const todo = todoList.find(todo => todo.id === todoId);
  const newText = prompt('Edit Todo:', todo.text);
  if (newText !== null && newText.trim() !== '') {
    todo.text = newText.trim();
    saveToLocalStorage();
    renderTodoList();
  }
}

function deleteTodo(todoId) {
  const index = todoList.findIndex(todo => todo.id === todoId);
  if (index !== -1) {
    todoList.splice(index, 1);
    saveToLocalStorage();
    renderTodoList();
  }
}
function toggleSubtaskInput(todoId) {
  const subtaskInput = document.getElementById(`subtaskInput-${todoId}`);
  subtaskInput.style.display = subtaskInput.style.display === 'none' ? 'block' : 'none';
}

function addSubtask(todoId) {
  const newSubtaskInput = document.getElementById(`newSubtask-${todoId}`);
  const subtaskText = newSubtaskInput.value.trim();

  if (subtaskText !== '') {
    const todo = todoList.find(todo => todo.id === todoId);
    const newSubtask = {
      text: subtaskText,
      done: false,
    };
    todo.subtasks.push(newSubtask);
    saveToLocalStorage();
    renderTodoList();
    newSubtaskInput.value = '';
  }
}

function toggleSubtaskDone(subtaskIndex) {
  const todoId = getTodoIdForSubtask(subtaskIndex);
  if (todoId !== null) {
    const todo = todoList.find(todo => todo.id === todoId);
    if (todo) {
      todo.subtasks[subtaskIndex].done = !todo.subtasks[subtaskIndex].done;
      saveToLocalStorage();
      renderTodoList();
    }
  }
}

function getTodoIdForSubtask(subtaskIndex) {
  for (const todo of todoList) {
    if (todo.subtasks.length > subtaskIndex) {
      return todo.id;
    }
  }
  return null;
}

function editSubtask(subtaskIndex) {
  const todoId = getTodoIdForSubtask(subtaskIndex);
  if (todoId !== null) {
    const todo = todoList.find(todo => todo.id === todoId);
    if (todo) {
      const newText = prompt('Edit Subtask:', todo.subtasks[subtaskIndex].text);
      if (newText !== null && newText.trim() !== '') {
        todo.subtasks[subtaskIndex].text = newText.trim();
        saveToLocalStorage();
        renderTodoList();
      }
    }
  }
}

function deleteSubtask(subtaskIndex) {
  const todoId = getTodoIdForSubtask(subtaskIndex);
  if (todoId !== null) {
    const todo = todoList.find(todo => todo.id === todoId);
    if (todo) {
      todo.subtasks.splice(subtaskIndex, 1);
      saveToLocalStorage();
      renderTodoList();
    }
  }
}
renderTodoList();
