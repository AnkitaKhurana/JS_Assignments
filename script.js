window.addEventListener('load',
    function () {
        let button = document.getElementById("AddButton");
        button.onclick = function () {
            let message = document.getElementById("input").value;
            addTodo(message);
            document.getElementById("input").value = "";
        };

        let DeleteButton = document.getElementById("DeleteAll");
        DeleteButton.onclick = function () {
            let lis = document.getElementById("list").getElementsByTagName("li");
            for (var i = 0; i < lis.length; ++i) {
                if (lis[i].children[4].checked == true) {
                    let removeIndex = todos.map(function (todo) { return todo.id.toString(); })
                        .indexOf(lis[i].id);
                    todos.splice(removeIndex, 1);
                }
            }
            let ul = document.getElementById("list");
            while (ul.firstChild) ul.removeChild(ul.firstChild);
            GetTodos(ul);
            let totalTodos = document.getElementById("totalTodos");
            totalTodos.innerHTML = todos.length;

            let count = 0;
            todos.map(x => { x.status == 1 ? count++ : "" })
            let completeTodos = document.getElementById("completeTodos");
            completeTodos.innerHTML = count;
        };

        let sortButton = document.getElementById("SortAll");
        sortButton.onclick = function () {
            sortList();
        };

        let sortButtonDT = document.getElementById("SortDT");
        sortButtonDT.onclick = function () {
            sortListDT();
        };

        let totalTodos = document.getElementById("totalTodos");
        totalTodos.innerHTML = todos.length;

        let count = 0;
        todos.map(x => { x.status == 1 ? count++ : "" })
        let completeTodos = document.getElementById("completeTodos");
        completeTodos.innerHTML = count;

    });

let todos = [];

function addTodo(message) {

    if (message == "") {
        alert("Please add Todo Content to add a Todo");
        return;
    }
    // Add to List of Todos
    let todo = new Object();
    todo.date = new Date();
    todo.id = todo.date;
    todo.status = 0;
    todo.message = message;
    todos.push(todo);

    // Add to DOM 
    let ul = document.getElementById("list");
    let li = document.createElement("li");
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(todo.message));
    li.setAttribute("id", todo.date);

    //Buttons
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("name", "deleteButton");
    deleteButton.innerHTML = "X";
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.classList.add("deleteButton");


    let upButton = document.createElement("button");
    upButton.setAttribute("name", "upButton");
    upButton.innerHTML = "&uarr;";
    upButton.classList.add("btn");
    upButton.classList.add("btn-success");
    upButton.classList.add("upButton");



    let downButton = document.createElement("button");
    downButton.setAttribute("name", "downButton");
    downButton.innerHTML = "&darr;";
    downButton.classList.add("btn");
    downButton.classList.add("btn-success");
    downButton.classList.add("downButton");


    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");


    // On clicks
    p.onclick = function () {
        strike(todo.date);
    };
    deleteButton.onclick = function () {
        deleteTodo(todo.date);
    };
    upButton.onclick = function () {
        moveUp(todo.date);
    };
    downButton.onclick = function () {
        moveDown(todo.date);
    };
    li.appendChild(p);
    li.appendChild(deleteButton);
    li.appendChild(upButton);
    li.appendChild(downButton);
    li.appendChild(checkbox);

    if (todos.length == 1) {
        downButton.disabled = false;
        upButton.disabled = true;
    }
    else {
        downButton.disabled = true;
        upButton.disabled = false;
        if (todos.length != 2) {
            ul.lastChild.childNodes[2].disabled = false;
            ul.lastChild.childNodes[3].disabled = false;
        }
    }
    ul.appendChild(li);
    let totalTodos = document.getElementById("totalTodos");
    totalTodos.innerHTML = todos.length;

    let count = 0;
    todos.map(x => { x.status == 1 ? count++ : "" })
    let completeTodos = document.getElementById("completeTodos");
    completeTodos.innerHTML = count;
}


function deleteTodo(liId) {

    // Remove from List
    let removeIndex = todos.map(function (todo) { return todo.id; })
        .indexOf(liId);
    todos.splice(removeIndex, 1);

    // Remove from Dom
    let li = document.getElementById(liId);
    let ul = document.getElementById("list");
    ul.removeChild(li);
    let totalTodos = document.getElementById("totalTodos");
    totalTodos.innerHTML = todos.length;

    let count = 0;
    todos.map(x => { x.status == 1 ? count++ : "" })
    let completeTodos = document.getElementById("completeTodos");
    completeTodos.innerHTML = count;
}


function strike(liId) {

    // Strike from List
    let strikeIndex = todos.map(function (todo) { return todo.id; })
        .indexOf(liId);
    todos[strikeIndex].status = (todos[strikeIndex].status == 1 ? 0 : 1);

    // Strike from Dom
    let li = document.getElementById(liId);
    if (li.style.textDecoration == "") {
        li.style.textDecoration = "line-through";
    }
    else {
        li.style.textDecoration = "";
    }
    let count = 0;
    todos.map(x => { x.status == 1 ? count++ : "" })
    let completeTodos = document.getElementById("completeTodos");
    completeTodos.innerHTML = count;
}


function moveUp(liId) {

    //Move Up in Todos
    let ElementIndex = todos.map(function (todo) { return todo.id; })
        .indexOf(liId);

    let PreviousElementOnTop = todos[ElementIndex - 1];
    todos[ElementIndex - 1] = todos[ElementIndex];
    todos[ElementIndex] = PreviousElementOnTop;

    // Move Up In DOM
    let elementOnBottom = document.getElementById(liId);
    let elementOnTop = document.getElementById(PreviousElementOnTop.id);
    elementOnTop.parentNode.insertBefore(elementOnBottom, elementOnTop);

    // Disable/Enable buttons
    elementOnTop.childNodes[2].disabled = false;
    elementOnBottom.childNodes[3].disabled = false;
    var ul = document.getElementById("list");
    if (ul.lastChild == elementOnTop) {
        elementOnTop.childNodes[3].disabled = true;
    }
    if (ul.childNodes[0] == elementOnBottom) {
        elementOnBottom.childNodes[2].disabled = true;
    }
}


function moveDown(liId) {

    //Move Down in Todos
    let ElementIndex = todos.map(function (todo) { return todo.id; })
        .indexOf(liId);

    let PreviousElementOnBottom = todos[ElementIndex + 1];
    todos[ElementIndex + 1] = todos[ElementIndex];
    todos[ElementIndex] = PreviousElementOnBottom;

    // Move Down In DOM
    let elementOnTop = document.getElementById(liId);
    let elementOnBottom = document.getElementById(PreviousElementOnBottom.id);
    elementOnTop.parentNode.insertBefore(elementOnBottom, elementOnTop);


    // Disable/Enable buttons
    elementOnTop.childNodes[2].disabled = false;
    elementOnBottom.childNodes[3].disabled = false;
    let ul = document.getElementById("list");
    if (ul.lastChild == elementOnTop) {
        elementOnTop.childNodes[3].disabled = true;
    }
    if (ul.childNodes[0] == elementOnBottom) {
        elementOnBottom.childNodes[2].disabled = true;
    }
}

function compare(a, b) {
    if (a.message.toLowerCase() < b.message.toLowerCase())
        return -1;
    if (a.message.toLowerCase() > b.message.toLowerCase())
        return 1;
    return 0;
}

function GetTodos(ul) {
    todos.forEach(function (todo, index) {
        let li = document.createElement("li");
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(todo.message));
        li.setAttribute("id", todo.date);

        //Buttons
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("name", "deleteButton");
        deleteButton.innerHTML = "X";
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-danger");
        deleteButton.classList.add("deleteButton");


        let upButton = document.createElement("button");
        upButton.setAttribute("name", "upButton");
        upButton.innerHTML = "&uarr;";
        upButton.classList.add("btn");
        upButton.classList.add("btn-success");
        upButton.classList.add("upButton");


        let downButton = document.createElement("button");
        downButton.setAttribute("name", "downButton");
        downButton.innerHTML = "&darr;";
        downButton.classList.add("btn");
        downButton.classList.add("btn-success");
        downButton.classList.add("downButton");


        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");


        // On clicks
        p.onclick = function () {
            strike(todo.date);
        };
        deleteButton.onclick = function () {
            deleteTodo(todo.date);
        };
        upButton.onclick = function () {
            moveUp(todo.date);
        };
        downButton.onclick = function () {
            moveDown(todo.date);
        };
        li.appendChild(p);
        li.appendChild(deleteButton);
        li.appendChild(upButton);
        li.appendChild(downButton);
        li.appendChild(checkbox);

        if (index == 0) {
            downButton.disabled = false;
            upButton.disabled = true;
        }
        else {
            downButton.disabled = true;
            upButton.disabled = false;

            if (index != 1) {
                ul.lastChild.childNodes[2].disabled = false;
                ul.lastChild.childNodes[3].disabled = false;
            }
        }
        if (todo.status == 1) {
            li.style.textDecoration = "line-through";
        }
        else {
            li.style.textDecoration = "";
        }
        ul.appendChild(li);
    });
}

function sortList() {
    let ul = document.getElementById("list");
    while (ul.firstChild) ul.removeChild(ul.firstChild);
    todos.sort(compare);
    GetTodos(ul);
}



function compareDT(a, b) {
    if (a.date < b.date)
        return -1;
    if (a.date > b.date)
        return 1;
    return 0;
}

function sortListDT() {
    let ul = document.getElementById("list");
    while (ul.firstChild) ul.removeChild(ul.firstChild);
    todos.sort(compareDT);
    GetTodos(ul);
}