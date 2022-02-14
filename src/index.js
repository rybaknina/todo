import ApiHandler from './ApiHandler.js';
import EventEmitter from './EventEmitter.mjs';
import TaskModel from "./TaskModel.mjs";
import renderTaskList from "./showcase.js";

import './assets/scss/main.scss';

const API_URL = '/api/v1';

const api = new ApiHandler(API_URL);
const eventEmitter = new EventEmitter();

const task = new TaskModel(api, eventEmitter);

eventEmitter.subscribe("taskFetched", (data) => {
    renderTaskList(task.getList());
});
task.fetch();

let addBtn = document.querySelector(".btn-add");

function addTask(event) {
    let name = document.querySelector(".input-task").value;
    if (name.trim() === "") {
        alert("You must write something!");
    } else {
        let i = document.querySelectorAll(".task-item").length + 1;
        let newTask = {id: i, name: name, completed: false};
        task.add(newTask);
        location.reload();
    }
    event.preventDefault();
}

addBtn.addEventListener("click", addTask);

const $todos = document.querySelector('.task-list');
$todos.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
        // todo update in server
    }
    if (event.target.tagName === "SPAN" && event.target.classList.contains("close")) {
        let id = event.target.parentNode.id;
        task.remove(id);
        location.reload();
    }
}, false);



