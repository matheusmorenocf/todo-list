let data = [
  {'task':'Estudar', 'status':'checked'},
  {'task':'Trabalhar', 'status':'checked'}
]

const clearTasks = () => {
  const list = document.querySelector('.container-tasks');
  while(list.firstChild) {
    list.removeChild(list.lastChild);
  }
}

const render = () => {
  clearTasks()
  data.forEach(dt => {createTask(dt.task, dt.status)})
}

render()


document.querySelector('.input-task i').addEventListener('click', (ev) => {
  data.push({tarefa: ev.target.previousElementSibling.value, status: ''})
  render()
})

function createTask(value, status) {
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('row');
  const task = document.createElement('input');
  task.disabled = 'true'
  task.value = value
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
      editTask(button, inputTask)
    })
  } else if (type === 'check') {
    button.classList.add('fa-check')
    button.addEventListener('click', () => {
      checkTask(inputTask)
    })
  } else {
    button.classList.add('fa-delete-left')
    button.addEventListener('click', () => {
      button.classList.add('fa-pen-to-square')
      const index = Array.from(document.querySelectorAll('.row')).indexOf(inputTask.parentElement);
      data.splice(index, 1);
      render();
    })
  }
  return button
}

function checkTask(inputTask) {
  inputTask.classList.toggle('checked');
  const index = Array.from(document.querySelectorAll('.row')).indexOf(inputTask.parentElement)
  if (data[index].status === 'checked') data[index].status = ''
  else data[index].status = 'checked'
}

function editTask(button, inputTask) {
  const index = Array.from(document.querySelectorAll('.row')).indexOf(inputTask.parentElement)
  data[index].task = inputTask.value
  if (button.classList.contains('fa-pen-to-square')) {
    inputTask.disabled = '';
    button.classList.remove('fa-pen-to-square');
    button.classList.add('fa-check-double') 
  }
  else {
    inputTask.disabled = 'true';
    button.classList.add('fa-pen-to-square');
    button.classList.remove('fa-check-double');
  }

}