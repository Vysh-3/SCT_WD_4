document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskDateTime = document.getElementById('taskDateTime');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    let tasks = [];

    addTaskButton.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskDate = taskDateTime.value;

        if (taskText === '' || taskDate === '') {
            alert('Please enter a task and set the date & time.');
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            dateTime: taskDate,
            completed: false
        };

        tasks.push(task);
        renderTasks();

        taskInput.value = '';
        taskDateTime.value = '';
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;
            li.innerHTML = `
                <span>${task.text} (${new Date(task.dateTime).toLocaleString()})</span>
                <div>
                    <button class="edit" onclick="editTask(${task.id})">✏️</button>
                    <button class="complete" onclick="completeTask(${task.id})">✅</button>
                    <button class="delete" onclick="deleteTask(${task.id})">❌</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    window.editTask = function(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            const newTaskText = prompt('Edit task:', task.text);
            const newTaskDateTime = prompt('Edit date & time:', task.dateTime);
            if (newTaskText && newTaskDateTime) {
                task.text = newTaskText;
                task.dateTime = newTaskDateTime;
                renderTasks();
            }
        }
    }

    window.completeTask = function(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            renderTasks();
        }
    }

    window.deleteTask = function(id) {
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
    }
});
