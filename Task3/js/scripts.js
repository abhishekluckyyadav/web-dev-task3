document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskText = taskInput.value.trim();
        const taskPriority = prioritySelect.value;

        if (taskText !== '') {
            const task = {
                id: Date.now(),
                text: taskText,
                priority: taskPriority,
                completed: false
            };

            tasks.push(task);
            saveTasks();
            renderTasks();

            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const taskId = target.closest('.task-item').dataset.id;

        if (target.classList.contains('delete-btn')) {
            tasks = tasks.filter(task => task.id != taskId);
            saveTasks();
            renderTasks();
        } else if (target.classList.contains('edit-btn')) {
            const task = tasks.find(task => task.id == taskId);
            const newTaskText = prompt('Edit task:', task.text);
            if (newTaskText) {
                task.text = newTaskText;
                saveTasks();
                renderTasks();
            }
        } else if (target.classList.contains('complete-btn')) {
            const task = tasks.find(task => task.id == taskId);
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        }
    });

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';

        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskItem.dataset.id = task.id;
            taskItem.innerHTML = `
                <span>${task.text} (${task.priority})</span>
                <div class="actions">
                    <button class="complete-btn">${task.completed ? 'Unmark' : 'Complete'}</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            taskList.appendChild(taskItem);
        });
    }

    renderTasks();
});
