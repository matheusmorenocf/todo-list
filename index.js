let data = [
  {"task": "Tarefa para teste", "status": "checked", "index": "1"},
  {"task": "As tarefas que você salva estão sendo armazenadas no local storage, então você nao as perde =)", "status": "to-do", "index": "2"}
]

const clearTasks = () => {
  const list = document.querySelector('.container-tasks');
  while(list.firstChild) {
    list.removeChild(list.lastChild);
  }
}

const render = () => {
  getTasks(data);
  clearTasks();
  data.forEach(dt => {createTask(dt.task, dt.status)})
}

render()


document.querySelector('.input-task i').addEventListener('click', (ev) => {
  saveTasks(data, ev.target.previousElementSibling.value, 'to-do');
  render();
  ev.target.previousElementSibling.value = '';
})

document.querySelector('.input-task input').addEventListener('keypress', (ev) => {
  if (ev.key == 'Enter') {
    saveTasks(data, ev.target.value, 'to-do');
    render();
    ev.target.value = '';
  }
})

function getTasks (data) {
  const dataLocal = JSON.parse(localStorage.getItem('data-task')) ?? [];
  dataLocal.forEach(item => {
    if(!data.some(dt => dt.index === item.index)) data.push(item)
  });
}

function saveTasks (data, value, currentStatus) {
  if(value && currentStatus) data.push({task: value, status: currentStatus, index: data.length + 1})
  localStorage.setItem('data-task', JSON.stringify(data))
}

function createTask(value, status) {
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('row');
  const task = document.createElement('span');
  task.classList.add('inputStyle')
  task.innerText = value
  status === 'checked' ? task.classList.add('checked') : void(0);
  const botaoConcluir = criarBotoes('check', task);
  const botaoEditar = criarBotoes('edit', task);
  const botaoApagar = criarBotoes('delete', taskContainer);
  taskContainer.append(task, botaoConcluir, botaoEditar, botaoApagar);
  document.querySelector('.container-tasks').append(taskContainer)
}

function criarBotoes(type, inputTask) {
  const button = document.createElement('i');
  button.classList.add(`btn-${type}`);
  button.classList.add('fa-solid')
  if (type === 'edit') {
    button.classList.add('fa-pen-to-square')
    button.addEventListener('click', () => {
      editTask(inputTask)
      
    })
  } else if (type === 'check') {
    button.classList.add('fa-check')
    button.addEventListener('click', () => {
      checkTask(inputTask)
      
    })
  } else {
    button.classList.add('fa-delete-left')
    button.addEventListener('click', () => {
      const index = Array.from(document.querySelectorAll('.row')).indexOf(inputTask);
      data.splice(index, 1);
      saveTasks(data)
      render();
    })
  }
  return button
}

function checkTask(inputTask) {
  inputTask.classList.toggle('checked');
  const index = Array.from(document.querySelectorAll('.row')).indexOf(inputTask.parentElement)
  if (data[index].status === 'checked') data[index].status = 'to-do'
  else data[index].status = 'checked'
}

function editTask(inputTask) {
  const index = Array.from(document.querySelectorAll('.row')).indexOf(inputTask.parentElement)
  const editForm = document.createElement('div');
  const editInput = document.createElement('input');
  const confirmButton = document.createElement('button');
  editForm.classList.add('editForm');
  editInput.classList.add('inputStyle');
  confirmButton.innerText = 'Confirmar'
  editForm.append(editInput,confirmButton);
  document.body.appendChild(editForm);
  editInput.value = data[index].task
  document.querySelector('.container').classList.add('hidden');

  confirmButton.addEventListener('click', () => editData(data, index, editForm));
  editInput.addEventListener('keypress', (ev) => {if(ev.key == 'Enter') {editData(data, index, editForm)}})
  
  


}

function editData (data, index, editForm) {
  data[index].task = document.querySelector('.editForm .inputStyle').value;
  document.querySelector('.container').classList.remove('hidden');
    document.body.removeChild(editForm);
    saveTasks(data);
    render();

}