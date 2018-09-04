let list;

if (typeof localStorage.getItem('array') === 'string'){
    list = JSON.parse(localStorage.getItem('array'));
} else {
    list = [];
}

renderList();// очищаем заголовок

function madeDone(order) {
    list[order].done = !list[order].done; // елемент массива.done: true;
    renderList();
}

function del(order){
    if (list.length === 1){
      list = [];
      localStorage.removeItem('array');
    } else if (+order === 0) {
        list = list.slice(1);
    } else if (+order === list.length - 1) {
        list = list.slice(0, -1);
    } else {
        let arr = list.slice(0, +order);
        arr = arr.concat(list.slice(+order + 1));
        list = arr;
    }
    renderList();
}

function addTodo() {
    let todoInput = document.getElementById('input');// ввод
    if (todoInput.value !== '') {
        let todoInputValue = todoInput.value;//значение ввода
        list.push({title: todoInputValue, done: false});// прибавляем объект с tittle: значение ввода в массив
        todoInput.value = '';//очищаем строку ввода
        localStorage.setItem('array', JSON.stringify(list));
        renderList();
    }
}

function renderList() {
    const tbody = document.getElementById('list');// ul#list
    tbody.innerHTML = '';// очищаем заголовок ul

    list.map((item, i) => {
        let tr = document.createElement('tr');// <tr>...</tr>
        let td = document.createElement('td');// <td>...</td>
        let icon = document.createElement('i');
        let tdButton = document.createElement('td'); //<td>...</td>
        td.innerHTML = item.title;// <td>Hello</td>

        let button = document.createElement('button');// <button></button>type="button" class="btn btn-outline-success"
        button.typeName = 'button';
        button.className = 'btn btn-outline-success';
        button.innerHTML = 'Done';// <button>Done</button>
        button.setAttribute('order', i);//присваиваем атрибут <button order="i">Done</button>
        button.addEventListener('click', (e) => {
            madeDone(e.target.getAttribute('order'));
        });

        icon.setAttribute('order', i);
        icon.className = 'fas fa-backspace';
        icon.addEventListener('click', (e) => {
            del(e.target.getAttribute('order'));
        });

        tdButton.appendChild(button);//<td><button>Done</button></td>
        tdButton.appendChild(icon);//= '<i class="fas fa-backspace"></i>'

        if (item.done) td.className = 'done';// <td class="done">Hello</td>
        tr.appendChild(td);//<tr><td>...</td></tr>
        tdButton.className = 'th';
        tr.appendChild(tdButton);//<tr><td>hello</td><td><button>Done</button></td></tr>
        tbody.append(tr);//ul --> <li>Hello<button>Done</button></li>
        localStorage.setItem('array',JSON.stringify(list));
    })
}

function loadTodo() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:5000', true);
    xhr.send();

    let todos = [];
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
            todos = JSON.parse(xhr.responseText).map(el => ({
                ...el,
                done: el.completed
            }));
            list = list.concat(todos);
            localStorage.setItem('array', JSON.stringify(list));
            renderList();
        }
    }
}

function clearList(){
    document.getElementById('input').value = '';
    localStorage.clear();
    list = [];
    renderList();
}