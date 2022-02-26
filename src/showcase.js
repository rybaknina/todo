const $todos = document.querySelector('.task-list');

const renderTaskItem = ({id, name}) => {
    return `<li id="${id}" class="task-item">${name}<span class="close">&#215;</span></li>`;
};

const renderCheckedTaskItem = ({id, name}) => {
    return `<li id="${id}" class="task-item checked">${name}<span class="close">&#215;</span></li>`;
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

export default renderTaskList;