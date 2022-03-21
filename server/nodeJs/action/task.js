var express = require('express')
var router = express.Router()
var taskbl = require('../bl/taskbl');

router.get('/getAllTasks', async function (req, res) {
    var tasks = await taskbl.getAllTasks(req.body)
    res.send(tasks)
})
router.post('/addTask', async function (req, res) {
    var task = await taskbl.addTask(req.body)
    res.send(task)
})
router.delete('/deleteTask', async function (req, res) {
    var task = await taskbl.deleteTask(req.body)
    res.send(task)
})
router.put('/updateStatusTask', async function (req, res) {
    var task = await taskbl.updateStatusTask(req.body)
    res.send(task)
})
router.put('/updateTask', async function (req, res) {
    var task = await taskbl.updateTask(req.body)
    res.send(task)
})
module.exports = router