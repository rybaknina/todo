import TaskList from './TaskList.mjs'

export default class TaskModel extends TaskList {
    constructor(apiHandler, eventEmitter) {
        super([]);
        this.api = apiHandler;
        this.eventEmmiter = eventEmitter;
    }

    getList() {
        return this.list;
    }

    find(id) {
        const index = this.list.findIndex((item) => item.id === parseInt(id));

        if (index >= 0) {
            return this.list[index];
        }

        return false;
    }

    fetch(onError) {
        this.api.getTask(
            (data) => {
                this.list = JSON.parse(data);
                this.eventEmmiter.emit('taskFetched', this.list);
            },
            onError
        )
    }

    add(task, onError) {
        this.api.addToTask(
            () => {
                this.list.push(task);
            },
            onError,
            task
        );
    }

    remove(id, onError) {
        let task = this.find(id);
        if (task) {
            this.api.removeFromTask(
                () => {
                    return this.list.splice(task.id, 1);
                },
                onError,
                this.list,
                id
            );
        }
    }
}