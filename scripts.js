const list = [
  {title: 'First', done: true},
  {title: 'Second', done: false}
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
  const ul = document.getElementById('list');// ul#list
  let li;

  let button;

  ul.innerHTML = '';// очищаем заголовок ul

  list.forEach((item, i) => {
      li = document.createElement('li');// <li></li>
      li.innerHTML = item.title;// <li>Hello</li>

      button = document.createElement('button');// <button></button>
      button.innerHTML = 'Done' + i;// <button>Done</button>
      button.setAttribute('order',i);//присваиваем атрибут <button order="i">Done</button>

      button.addEventListener('click', (e)=> {
          console.log(e.target.getAttribute('order'));
          madeDone(e.target.getAttribute('order'));
      });

      if(item.done) li.className = 'done';// <li class="done">Hello</li>
      li.appendChild(button);//<li>Hello<button>Done</button></li>
      ul.append(li);//ul --> <li>Hello<button>Done</button></li>
  })}

