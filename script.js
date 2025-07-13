const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const prioritySelect = document.getElementById("priority-select");
const filterSelect = document.getElementById("filter-priority");
const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateCounters() {
  totalCount.textContent = todos.length;
  completedCount.textContent = todos.filter(t => t.completed).length;
}

function renderTodos(filter = "All") {
  list.innerHTML = "";

  todos
    .filter(todo => filter === "All" || todo.priority === filter)
    .forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = "todo-item";
      if (todo.completed) li.classList.add("completed");

      const span = document.createElement("span");
      span.textContent = todo.text;

      const info = document.createElement("div");
      info.innerHTML = `<span class="priority-label">[${todo.priority}]</span>
                        <span class="date-label">${todo.date}</span>`;

      const actions = document.createElement("div");
      actions.className = "todo-actions";

      const completeBtn = document.createElement("button");
      completeBtn.innerHTML = "✅";
      completeBtn.title = "Mark as complete";
      completeBtn.onclick = () => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos(filterSelect.value);
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "❌";
      deleteBtn.title = "Delete task";
      deleteBtn.onclick = () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos(filterSelect.value);
      };

      actions.appendChild(completeBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(info);
      li.appendChild(actions);

      list.appendChild(li);
    });

  updateCounters();
}

addBtn.addEventListener("click", () => {
  const taskText = input.value.trim();
  const priority = prioritySelect.value;
  const date = new Date().toLocaleDateString();

  if (taskText !== "") {
    todos.push({ text: taskText, priority, date, completed: false });
    saveTodos();
    input.value = "";
    renderTodos(filterSelect.value);
  } else {
    alert("Please enter a task!");
  }
});

filterSelect.addEventListener("change", () => {
  renderTodos(filterSelect.value);
});

// Initial render
renderTodos();
