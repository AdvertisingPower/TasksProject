var Task = require("../models/task");
var Connection = require("../connectMySql");


var getAllTasks = () => {
    obj = {}
    return Connection
        .executeStatement(`select * from tbl_tasks`)
        .then((taskInfo) => {
            if (taskInfo.length > 0) {
                console.log(taskInfo)
                return taskInfo;
            }
            else {
                return null
            }
        }
        ).catch(err => {
            console.log(err);
            return err;
        })
}

var addTask = (t) => {
    obj = {}
    return Connection
        .executeStatement(`INSERT INTO tbl_tasks(task_name,description,date,due_Date,status)
          VALUES ('${t.task_name}', '${t.description}','${t.date}','${t.due_Date}','${t.status}')`)
        .then((taskInfo) => {
            return taskInfo;
        }
        ).catch(err => {
            console.log(err)
            return err
        })
}

var deleteTask = (t) => {
    obj = {}
    return Connection
        .executeStatement(`delete from tbl_tasks where ID=${t.ID}`)
        .then((taskInfo) => {
            return taskInfo;
        }
        ).catch(err => {
            console.log(err)
            return err
        })
}

var updateStatusTask = (t) => {
    obj = {}
    return Connection
        .executeStatement(`update tbl_tasks set status = ${!t.status} where ID=${t.ID}`)
        .then((taskInfo) => {
            return taskInfo;
        }
        ).catch(err => {
            console.log(err)
            return err
        })
}
var updateTask = (t) => {
    obj = {}
    return Connection
        .executeStatement(`update tbl_tasks set task_name = '${t.task_name}', description = '${t.description}' where ID=${t.ID}`)
        .then((taskInfo) => {
            return taskInfo;
        }
        ).catch(err => {
            console.log(err)
            return err
        })
}

module.exports = { getAllTasks, addTask, deleteTask, updateStatusTask, updateTask }