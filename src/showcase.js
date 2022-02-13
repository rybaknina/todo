const $todos = document.querySelector('.task-list');

const renderTaskItem = ({name}) => {
    return `<li class="task-item">${name}<span class="close">&#215;</span></li>`;
};

const renderCheckedTaskItem = ({name}) => {
    return `<li class="task-item checked">${name}<span class="close">&#215;</span></li>`;
};

const renderTaskList = (list) => {
    while ($todos.firstChild) {
        $todos.removeChild($todos.firstChild);
    }

    let taskList = list.map(
        (item) => {
            let taskItem;
            if (item.completed === true) {
                taskItem = renderCheckedTaskItem(item);
            } else {
                taskItem = renderTaskItem(item);
            }
            return taskItem;
        }
    ).join('');

    $todos.insertAdjacentHTML('beforeend', taskList);
}

// todo write to server
// Add a "checked" symbol when clicking on a list item
$todos.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

export default renderTaskList;