const Task = require("../models/task");
const dal = require("../dal/taskdal");

var getAllTasks = async (req) => {
    console.log('ttt')
    return await dal.getAllTasks();
};
var addTask = async (req) => {
    const task = new Task.Task(req);
    return await dal.addTask(task);
}
var deleteTask = async (req) => {
    const task = new Task.Task(req);
    return await dal.deleteTask(task);
}
var updateStatusTask = async (req) => {
    const task = new Task.Task(req);
    return await dal.updateStatusTask(task);
}
var updateTask = async (req) => {
    const task = new Task.Task(req);
    return await dal.updateTask(task);
}
module.exports = { getAllTasks, addTask, deleteTask, updateStatusTask, updateTask }


