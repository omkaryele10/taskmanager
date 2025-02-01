document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const addTaskSection = document.getElementById('add-task');
    const taskListSection = document.getElementById('task-list');
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('tasks');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const users = [
        { username: 'user', password: 'password' }
    ];

    // Show login form initially
    document.getElementById('login').style.display = 'block';

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            document.getElementById('login').style.display = 'none';
            addTaskSection.style.display = 'block';
            taskListSection.style.display = 'block';
            tasks.forEach(task => addTaskToDOM(task));
        } else {
            alert('Invalid username or password');
        }
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const dueDate = document.getElementById('task-due-date').value;

        if (title && description) {
            const task = { title, description, dueDate, completed: false };
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            addTaskToDOM(task);
            taskForm.reset();
        }
    });

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion(this)">
                <span class="${task.completed ? 'task-completed' : ''}">
                    <strong>${task.title}</strong>
                    <p>${task.description}</p>
                    <p><em>Due: ${task.dueDate || 'No due date'}</em></p>
                </span>
            </div>
            <div class="task-actions">
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    }

    window.toggleCompletion = function(checkbox) {
        const li = checkbox.parentElement.parentElement;
        const title = li.querySelector('strong').innerText;
        const description = li.querySelector('p').innerText;

        tasks = tasks.map(task => {
            if (task.title === title && task.description === description) {
                task.completed = checkbox.checked;
            }
            return task;
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));

        const span = li.querySelector('span');
        if (checkbox.checked) {
            span.classList.add('task-completed');
        } else {
            span.classList.remove('task-completed');
        }
    };

    window.editTask = function(button) {
        const li = button.parentElement.parentElement;
        const title = li.querySelector('strong').innerText;
        const description = li.querySelector('p').innerText;
        const dueDate = li.querySelector('em').innerText.replace('Due: ', '');

        document.getElementById('task-title').value = title;
        document.getElementById('task-description').value = description;
        document.getElementById('task-due-date').value = dueDate === 'No due date' ? '' : dueDate;

        // Remove the task from the list and localStorage
        tasks = tasks.filter(task => task.title !== title || task.description !== description);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.remove();
    };

    window.deleteTask = function(button) {
        const li = button.parentElement.parentElement;
        const title = li.querySelector('strong').innerText;
        const description = li.querySelector('p').innerText;

        // Remove the task from the list and localStorage
        tasks = tasks.filter(task => task.title !== title || task.description !== description);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.remove();
    };
});
