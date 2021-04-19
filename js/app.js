window.onload = function () {
	const btnNewTask = document.querySelector('.btn-newtask');
	btnNewTask.addEventListener('click', addTodoItem);

	const categoriesBox = ['orange', 'pink', 'wave', 'ocher'];

	function randomcategoriesBox() {
		const index = Math.floor(Math.random() * categoriesBox.length);
		return categoriesBox[index];
	}

	// creating task card
	function createTask() {
		const innerTaskBox = `
			<div class='task-categoriesBox'>
				<svg class="icon-task" width='30' height='30'>
					<use xlink:href="img/icons.svg#task"></use>
				</svg>
			</div>

			<div class='task-contentBox'>

				<div class='task-contentMain'>
					<div class='task-textBox'>
					<input class='task-input' placeholder='I want to...' type="text"></input>
					</div>

					<button class='task-save'>save</button>
				</div>

				<div class='task-iconsBox'>
					<a title='done'>
						<svg class="icon icon-checkbox" width='32' height='32'>
							<use xlink:href="img/icons.svg#checkbox"></use>
						</svg>
					</a>

					<a title='edit'>
						<svg class="icon icon-edit" width='32' height='32'>
							<use xlink:href="img/icons.svg#edit"></use>
						</svg>
					</a>

					<a title='delete'>
						<svg class="icon icon-close" width='28' height='28'>
							<use xlink:href="img/icons.svg#close"></use>
						</svg>
			</div>
		`;

		const $task = document.createElement('div');
		$task.classList.toggle('task-box');
		$task.innerHTML = innerTaskBox;

		const $startText = document.querySelector('.start-text');
		$startText.innerText = ``;

		const $content = document.querySelector('.content');
		$content.appendChild($task);

		return $task;
	}

	// task creation handler
	function addTodoItem(event) {
		event.preventDefault();

		document.querySelector('.header-countTasks').innerText++;

		const newTask = createTask();

		const categoriBox = newTask.querySelector('.task-categoriesBox');
		const taskTextBox = newTask.querySelector('.task-textBox');
		const contentMain = newTask.querySelector('.task-contentMain');

		const classcategoriBox = randomcategoriesBox();
		categoriBox.classList.add(classcategoriBox);

		// save
		const btnSave = newTask.querySelector('.task-save');
		btnSave.addEventListener('click', () => {
			const addInput = newTask.querySelector('.task-input');

			if (addInput.value === '') {
				btnSave.disable = true;
			} else {
				const titleTask = saveTask(newTask);
				taskTextBox.appendChild(titleTask);

				if (btnSave.parentNode) {
					btnSave.parentNode.removeChild(btnSave);
				}
			}
		});

		// cross out
		const btnDoneTask = newTask.querySelector('.icon-checkbox');
		btnDoneTask.addEventListener('click', () => {
			doneTask(newTask);
		})

		// edit
		const btnEditTask = newTask.querySelector('.icon-edit');
		btnEditTask.addEventListener('click', () => {
			const addInput = editTask(newTask, contentMain, btnSave);

			if (addInput) {
				taskTextBox.appendChild(addInput);
			} else { btnEditTask.disable = true; }
		});

		// delete
		const btnCloseTask = newTask.querySelector('.icon-close');
		btnCloseTask.addEventListener('click', () => {
			document.querySelector('.header-countTasks').innerText--;
			deleteTask(newTask);
		});
	}

	// save name
	function saveTask(newTask) {
		const addInput = newTask.querySelector('.task-input');
		const titleTask = document.createElement('label');
		titleTask.className = 'task-title';
		titleTask.innerText = addInput.value;

		if (addInput.parentNode) {
			addInput.parentNode.removeChild(addInput);
		}

		return titleTask;
	}

	// cross out name
	function doneTask(thisTask) {
		const titleTask = thisTask.querySelector('.task-title');
		if (titleTask) {
			titleTask.classList.toggle('task-done');
		}
	}

	// edit name
	function editTask(thisTask, contentMain, btnSave) {
		const titleTask = thisTask.querySelector('.task-title');

		if (titleTask) {
			contentMain.appendChild(btnSave);

			const contentTitle = titleTask.innerText;

			if (titleTask.parentNode) {
				titleTask.parentNode.removeChild(titleTask);
			}

			const addInput = document.createElement('input');
			addInput.className = 'task-input';
			addInput.type = 'text';
			addInput.value = contentTitle;

			return addInput;
		}
	}

	// delete task
	function deleteTask(thisTask) {
		if (thisTask.parentNode) {
			thisTask.parentNode.removeChild(thisTask);
		}
	}
}