//import { random } from 'lodash'

function random() {
    return 2
}

export default class MockApi {
    constructor() {
        this.lastIndex = 0;

        this.tasks = [
            'task1',
            'task2',
            'task3'
        ]
    }

    // getTask(onSuccess) {
    //     onSuccess(JSON.stringify(this.getTaskList(3)))
    // }

    addToTask(onSuccess) {
        onSuccess('{status: OK}')
    }

    removeFromTask(onSuccess) {
        onSuccess('{status: OK}')
    }

    getTaskName() {
        const task = this.tasks[random(0, this.tasks.length - 1)]

        return `${task}`;
    }

    getTask() {
        return {
            id: ++this.lastIndex,
            name: this.getTaskName(),
            completed: false
        }
    }

    getTaskList(count) {
        let tasks = [];

        for (let i = 0; i < count; i++) {
            tasks.push(this.getTask());
        }

        return tasks;
    }
}