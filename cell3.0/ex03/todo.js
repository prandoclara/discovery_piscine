document.addEventListener('DOMContentLoaded', function() {
    const ftList = document.getElementById('ft_list');
    const newTaskButton = document.getElementById('newTaskButton');

    // Charger les tâches à partir des cookies lors du chargement de la page
    loadTasks();

    // Ajouter un événement pour créer une nouvelle tâche
    newTaskButton.addEventListener('click', function() {
        const task = prompt('Entrez une nouvelle tâche :');
        if (task !== null && task !== '') {
            addTask(task);
        }
    });

    // Fonction pour ajouter une nouvelle tâche
    function addTask(taskText) {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.textContent = taskText;

        // Ajouter un événement pour supprimer la tâche lorsqu'elle est cliquée
        taskElement.addEventListener('click', function() {
            const confirmation = confirm('Voulez-vous supprimer cette tâche ?');
            if (confirmation) {
                ftList.removeChild(taskElement);
                saveTasks();
            }
        });

        // Ajouter la tâche en haut de la liste
        ftList.insertBefore(taskElement, ftList.firstChild);

        // Enregistrer la liste mise à jour dans les cookies
        saveTasks();
    }

    // Fonction pour charger les tâches à partir des cookies
    function loadTasks() {
        const tasks = getCookie('tasks');
        if (tasks) {
            const tasksArray = tasks.split(',');
            tasksArray.forEach(function(task) {
                addTask(task);
            });
        }
    }

    // Fonction pour enregistrer les tâches dans les cookies
    function saveTasks() {
        const tasks = Array.from(ftList.children).map(function(taskElement) {
            return taskElement.textContent;
        });
        setCookie('tasks', tasks.join(','), 7);
    }

    // Fonction pour définir un cookie
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
    }

    // Fonction pour récupérer la valeur d'un cookie
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) {
                return cookieValue;
            }
        }
        return null;
    }
});
