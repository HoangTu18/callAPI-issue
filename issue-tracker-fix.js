let listTodos = [];
const issueInputForm = document.getElementById("issueInputForm");
const searchInput = document.getElementById("searchInput");

function renderTodos(todos) {
  const issuesList = document.getElementById("issuesList");

  // reset
  issuesList.innerHTML = "";

  for (const index in todos) {
    const todoId = todos[index].id;
    const todoStatus = todos[index].status;
    const todoDesc = todos[index].description;
    const todoSeverity = todos[index].severity;

    issuesList.innerHTML += `
      <div class="card">
        <div class="card-header d-flex align-items-center">
          ${todoId} <span class="badge badge-secondary status" style="display:inline-block; margin-left: 5px;">${todoStatus}</span>
        </div>
        <div class="card-body">
          <h5 class="card-title">${todoDesc}</h5>
          <p class="card-text"><span class="badge badge-primary">${todoSeverity}</span></p>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary" style="margin-right: 10px;" onclick="changeStatusTodo(\'${todoId}\')">Close</button>
            <button type="submit" class="btn btn-danger" onclick="deleteTodo(\'${todoId}\')">Delete</button>
          </div>
        </div>
      </div>
      <br />
    `;
  }
}

// add todo
issueInputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const description = document.getElementById("description").value;
  const severity = document.getElementById("severity").value;

  const todo = {
    id: Date.now(),
    status: "new",
    description,
    severity,
  };

  listTodos.push(todo);
  renderTodos(listTodos);
});

// search
const formSearch = document.getElementById("formSearch");
formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  const keyword = searchInput.value.toLowerCase();
  let todoSearched = [...listTodos];
  todoSearched = newTodos.filter(
    (todo) => !todo.description.toLowerCase().indexOf(keyword)
  );
  renderTodos(todoSearched);
});

// sort

const orderBy = document.getElementById("orderBy");
orderBy.addEventListener("change", (e) => {
  e.preventDefault();
  let order = Number(orderBy.value);
  const todosSorted = [...listTodos];
  todosSorted.sort((a, b) => {
    if (a.description > b.description) return order;
    if (a.description < b.description) return -order;
    return 0;
  });
  renderTodos(todosSorted);
});

// change status
function changeStatusTodo(todoId) {
  // find index of todo item in array
  const todoIndex = listTodos.findIndex((todo) => todo.id === Number(todoId));
  const status = listTodos[todoIndex].status;
  if (status === "new") {
    listTodos[todoIndex].status = "closed";
  } else {
    listTodos[todoIndex].status = "new";
  }
  renderTodos(listTodos);
}

function filterSelection(status) {
  if (status === "all") {
    return renderTodos(listTodos);
  }
  const todoFilter = listTodos.filter((item) => item.status === status);
  renderTodos(todoFilter);
}

function deleteTodo(todoId) {
  // cach 1
  // const todosIndex = listTodos.indexOf(todoId);
  // const newTodos = listTodos[todo.id].splice(todosIndex, 1);
  // cach 2
  const todoIndex = listTodos.findIndex((todo) => todo.id === Number(todoId));
  listTodos.splice(todoIndex, 1);
  // cach 3
  // for (var i = 0; i < listTodos.length; i++) {
  //   if (listTodos[i].id === todoId) {
  //     listTodos.splice(i, 1);
  //   }
  // }
  renderTodos(listTodos);
}

// function deleteTodo(todoId) {
//   console.log(todoId);
//   removeTodoId(todoId);
//   renderTodos(listTodos);
// }
// function removeTodoId(todoId) {
//   return listTodos.filter(function (ele) {
//     return ele != todoId;
//   });
// }
