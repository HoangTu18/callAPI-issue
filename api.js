const textInput = document.getElementById("description");
const textOutput = document.getElementById("showOutput");
const loadingBtn = document.getElementById("create");
loadingBtn.addEventListener("click", fetchHandler);

// Modal

// selecting loading div
const loader = document.querySelector("#loading");

// showing loading
function displayLoading() {
  loader.classList.add("display");
  // to stop loading after some time
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}

// hiding loading
function hideLoading() {
  loader.classList.remove("display");
}

// dummy url
var url = "https://lessonfourapi.tanaypratap.repl.co/translate/yoda.json";

function fetchHandler(event) {
  displayLoading();
  var input = textInput.value;
  var finalURL = buildURL(input);

  fetch(finalURL)
    .then((response) => response.json())
    .then((json) => {
      hideLoading();
      textOutput.innerText = json.contents.translated;
    });
}

function buildURL(inputData) {
  return `${url}?text=${inputData}`;
}

const apiLink = "https://tony-json-server.herokuapp.com/api/todos";

// fetch list todos
function getData() {
  fetch(apiLink)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const values = data.data;
      renderData(values);
    });
}
getData();

//post data
function createData(formData) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  fetch(apiLink, options)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      getData();
    });
}

//render
function renderData(values) {
  var issuesList = document.getElementById("issuesList");
  var htmls = values.map(function (value) {
    return ` <div class="card-${value.id}">
        <div class="card-header d-flex align-items-center">
          ${value.id} <span class="badge badge-secondary status${value.id}" style="display:inline-block; margin-left: 5px;">${value.status}</span>
        </div>
        <div class="card-body">
          <h5 class="card-title descriptionRender${value.id}">Description: ${value.description}</h5>
          <h5 class="card-title authorRender${value.id}">Author: ${value.author}</h5>
          <p class="card-text "><span id="severityRender${value.id}" class="badge badge-primary">${value.severity}</span></p>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary" style="margin-right: 10px;" onclick=changeStatusTodo("${value.id}")>Close</button>
            <button type="submit" class="btn btn-danger" style="margin-right: 10px;" onclick=deleteTodo("${value.id}") >Delete</button>
            <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" id="myBtn${value.id}" 
            onclick=editTodo("${value.id}") data-target="#modelId">
Edit
</button>
</div>
          </div>
        </div>
      </div>
      <br />
    `;
  });
  issuesList.innerHTML = htmls.join("");
}

function createData(formData) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  fetch(apiLink, options)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      getData();
    });
}

var createBtn = document.getElementById("create");
createBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var description = document.getElementById("description").value;
  var severity = document.getElementById("severity").value;
  const author = document.getElementById("author").value;
  let formData = {
    id: Date.now(),
    author,
    description: description,
    severity: severity,
    status: "open",
  };
  createData(formData);
});

function deleteTodo(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`${apiLink}/${id}`, options)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      getData(renderData);
    });
}

function editTodo(id) {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn" + id);

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  const descriptionRender = document.querySelector(
    ".descriptionRender" + id
  ).textContent;
  const authorRender = document.querySelector(".authorRender" + id).textContent;
  const severityRender = document.querySelector(
    "#severityRender" + id
  ).textContent;

  const descriptionModal = document.getElementById("description-model");
  const authorModal = document.getElementById("author-model");
  const severityModal = document.getElementById("severity-option-model");

  descriptionModal.value = descriptionRender;
  authorModal.value = authorRender;
  severityModal.value = severityRender;

  const updateBtn = document.getElementById("updateBtn");
  updateBtn.addEventListener("click", () => {
    var options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: descriptionModal.value,
        author: authorModal.value,
        status: "new",
        severity: severityModal.value,
      }),
    };
    fetch(`${apiLink}/${id}`, options)
      .then(function (response) {
        return response.json();
      })
      .then(function () {
        getData(renderData);
      });
  });
}

// search
const formSearch = document.getElementById("formSearch");
formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  function getData() {
    fetch(apiLink)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        const values = data.data;
        let newList = [...values];
        let searchList = newList.filter(
          (item) =>
            item.description.toLowerCase().includes(keyword) ||
            item.author.toLowerCase().includes(keyword)
        );
        renderData(searchList);
      });
  }
  getData();
});

// filter
document.querySelectorAll(".sortBtn").forEach((button) => {
  button.addEventListener("click", () => {
    function getData() {
      fetch(apiLink)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const values = data.data;
          let newList = [...values];
          let value = button.value;
          if (value == "all") {
            renderData(values);
          } else {
            let filterList = newList.filter((item) => item.status == value);
            renderData(filterList);
          }
        });
    }
    getData();
  });
});

// changeStatus
function changeStatusTodo(id) {
  let newStatus = document.querySelector(".status" + id).textContent;
  var options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: (newStatus = newStatus == "new" ? "close" : "new"),
    }),
  };
  fetch(`${apiLink}/${id}`, options)
    .then(function (res) {
      return res.json();
    })
    .then(function () {
      getData(renderData);
    });
}
