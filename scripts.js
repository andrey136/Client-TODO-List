let arr;
let count = 0;
let count3 = 0;

if (typeof localStorage.getItem('array') === "string"){
    arr = JSON.parse(localStorage.getItem('array'));
} else {
    arr = [];
}

if (arr.length > 0) renderList();// очищаем заголовок

function madeDone(order) {
    let obj = JSON.parse(localStorage.getItem(order));
    obj.done = !obj.done;
    localStorage.setItem(order,JSON.stringify(obj));
    renderList();
}

function del(i){
    localStorage.removeItem(arr[i]);
    if (+i === 0) {
        arr = arr.slice(1);
    } else if (+i === arr.length - 1) {
        arr = arr.slice(0, -1);
    } else {
        let arr2 = arr.slice(0, +i);
        arr = arr2.concat(arr.slice(+i + 1));
    }
    localStorage.setItem('array', JSON.stringify(arr));
    renderList();
}

function addTodo() {
    let todoInput = document.getElementById('input');// ввод
    if (todoInput.value !== '') {
        let todoInputValue = todoInput.value;//значение ввода
        if (arr.length === 0){
            localStorage.setItem(count.toString(),JSON.stringify({title: todoInputValue, done: false}));
            arr.push(count.toString());
        } else {
            localStorage.setItem((+arr[arr.length - 1] + 1).toString(),JSON.stringify({title: todoInputValue, done: false}));// прибавляем объект с tittle: значение ввода в массив
            arr.push((+arr[arr.length - 1] + 1).toString());
        }
        todoInput.value = '';//очищаем строку ввода

        localStorage.setItem('array', JSON.stringify(arr));
        renderList();
    }
}

function renderList() {
    let tbody = document.getElementById('list');// ul#list
    let tr;
    let td;
    let tdButton;
    let button;
    let icon;
    tbody.innerHTML = '';// очищаем заголовок ul

    for (let i = 0; i < arr.length; i++) {
        i = i.toString();
        tr = document.createElement('tr');// <tr>...</tr>
        td = document.createElement('td');// <td>...</td>
        tdButton = document.createElement('td'); //<td>...</td>
        icon = document.createElement('i');
        button = document.createElement('button');// <button></button>type="button" class="btn btn-outline-success"

        button.innerHTML = 'Done';// <button>Done</button>
        button.className = 'btn btn-outline-success';
        button.setAttribute('order', arr[+i]);//присваиваем атрибут <button order="i">Done</button>
        button.addEventListener('click', (e) => {
            madeDone(e.target.getAttribute('order'));
        });

        icon.className = 'fas fa-backspace';
        icon.setAttribute('order', i);
        icon.addEventListener('click', (e) => {
            del(e.target.getAttribute('order'));
        });

        tdButton.className = 'th';
        tdButton.appendChild(button);//<td><button>Done</button></td>
        tdButton.appendChild(icon);//= '<i class="fas fa-backspace"></i>'

        td.innerHTML = JSON.parse(localStorage.getItem(arr[+i])).title;// <td>Hello</td>
        if (JSON.parse(localStorage.getItem(arr[+i])).done) td.className = 'done';// <td class="done">Hello</td>

        tr.appendChild(td);//<tr><td>...</td></tr>
        tr.appendChild(tdButton);//<tr><td>hello</td><td><button>Done</button></td></tr>

        tbody.appendChild(tr);//ul --> <li>Hello<button>Done</button></li>
    }
}

function loadTodo() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET','https://jsonplaceholder.typicode.com/todos', true);
    xhr.send();

    let todos = [];
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            todos = JSON.parse(xhr.responseText).map(el => ({
                ...el,
                done: el.completed
            }));
            if (arr.length === 0) {
                for(let i = 0; i < todos.length; i++){
                    XMLcycle(i,todos)
                }
            } else {
                for (let i = +arr[arr.length - 1] + 1; i < i + todos.length; i++){
                    XMLcycle(i, todos);
                }
            }
        }
    }
}

function XMLcycle(i, todos){
    i = i.toString();
    localStorage.setItem(i, JSON.stringify(todos[count3]));
    count3++;
    arr.push(i);
    renderList();
}