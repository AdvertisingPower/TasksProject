exports.Task = class Task {
    constructor(request) {
        this.ID = request.ID;
        this.task_name = request.task_name;
        this.description = request.description;
        this.date = request.date;
        this.due_Date = request.due_Date;
        this.status = request.status;
    }
};

