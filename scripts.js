const list = [
];

renderList();// очищаем заголовок

function madeDone(order){
    list[order].done = !list[order].done; // елемент массива.done: true;
    renderList();
}

function addTodo() {
    let todoInput = document.getElementById('input');// ввод
    let todoInputValue = todoInput.value;//значение ввода
    list.push({ title: todoInputValue, done: false });// прибавляем объект с tittle: значение ввода в массив
    todoInput.value = '';//очищаем строку ввода
    console.log(list);
    renderList();
}

function renderList() {
    const tbody = document.getElementById('list');// ul#list
    let tr;
    let td;
    let tdButton;

    let button;

    tbody.innerHTML = '';// очищаем заголовок ul

    list.forEach((item, i) => {
        tr = document.createElement('tr');// <tr>...</tr>
        td = document.createElement('td');// <td>...</td>
        tdButton = document.createElement('td'); //<td>...</td>
        td.innerHTML = item.title;// <td>Hello</td>

        button = document.createElement('button');// <button></button>type="button" class="btn btn-outline-success"
        button.typeName = 'button';
        button.className = 'btn btn-outline-success';
        button.innerHTML = 'Done';// <button>Done</button>
        button.setAttribute('order',i);//присваиваем атрибут <button order="i">Done</button>

        button.addEventListener('click', (e)=> {
            console.log(e.target.getAttribute('order'));
            madeDone(e.target.getAttribute('order'));
        });

        tdButton.appendChild(button);//<td><button>Done</button></td>

        if(item.done) td.className = 'done';// <td class="done">Hello</td>
        tr.appendChild(td);//<tr><td>...</td></tr>
        tdButton.className = 'th';
        console.log(tdButton);
        tr.appendChild(tdButton);//<tr><td>hello</td><td><button>Done</button></td></tr>
        console.log(tr);
        tbody.append(tr);//ul --> <li>Hello<button>Done</button></li>
    })}