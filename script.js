document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('tasks');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Load tasks from localStorage
    tasks.forEach(task => addTaskToDOM(task));

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;

        if (title && description) {
            const task = { title, description };
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
                <strong>${task.title}</strong>
                <p>${task.description}</p>
            </div>
            <div class="task-actions">
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    }

    window.editTask = function(button) {
        const li = button.parentElement.parentElement;
        const title = li.querySelector('strong').innerText;
        const description = li.querySelector('p').innerText;

        document.getElementById('task-title').value = title;
        document.getElementById('task-description').value = description;

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