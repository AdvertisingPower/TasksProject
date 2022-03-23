import React, { useEffect } from 'react'
import { useState } from 'react';
import { Modal, Button, ButtonGroup } from 'react-bootstrap'
import DatePicker from 'react-date-picker';
import './style.css'
const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

export default function TasksList(props) {

    const { currentUser } = props;
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState(new Date());
    const [tasks, setTasks] = useState()
    const [totalTasks, setTotalTasks] = useState()
    const [show, setShow] = useState(false);
    // const { items, requestSort, sortConfig } = useSortableData(tasks);

    const handleClose = () => setShow(false);
    function handleShow() {
        setShow(true)
    }
    const [showE, setShowE] = useState(false);
    const handleCloseE = () => setShowE(false);
    function handleShowE() {
        setShowE(true)
    }
    function readUserTasks() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', '*');
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch("http://localhost:3020/tasks/getAllTasks", requestOptions)
            .then(response => response.json())
            .then(result => {
                setTasks(result)
                setTotalTasks(result)
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        debugger
        if (tasks === undefined)
            readUserTasks()
    }, [])

    function addTask(index) {
        if (taskTitle !== '') {
            setTaskTitle('')
            handleClose()
            let currentTask = {
                "task_name": taskTitle,
                "description": taskDescription,
                "date": new Date(),
                "due_Date": taskDate,
                "status": 0
            }
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('Access-Control-Allow-Origin', '*');
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(currentTask),
            };
            fetch("http://localhost:3020/tasks/addTask", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    readUserTasks()
                })
                .catch(error => console.log('error', error));
        }
    }
    function deleteTask(index) {
        debugger
        var Difference_In_Time = new Date().getTime() - Date.parse(tasks[2].due_Date);
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        if (Difference_In_Days > 6) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('Access-Control-Allow-Origin', '*');
            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: JSON.stringify(tasks[index]),
            };
            fetch("http://localhost:3020/tasks/deleteTask", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    readUserTasks()
                })
                .catch(error => console.log('error', error));

        }
        else {
            handleShowE()
        }
    }
    function updateStatusTask(index) {
        console.log(tasks[index].completed, tasks[index].date)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', '*');
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(tasks[index]),
        };
        fetch("http://localhost:3020/tasks/updateStatusTask", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                readUserTasks()
            })
            .catch(error => console.log('error', error));

    }
    function updateTask(index) {
        debugger
        if (taskTitle !== '') {
            tasks[index].task_name = taskTitle
            document.getElementsByClassName('input').value = ''
            setTaskTitle('')
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('Access-Control-Allow-Origin', '*');
            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(tasks[index]),
            };
            fetch("http://localhost:3020/tasks/updateTask", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    readUserTasks()
                })
                .catch(error => console.log('error', error));
        }
    }
    function updateTaskDes(index) {
        if (taskDescription !== '') {
            tasks[index].description = taskDescription
            document.getElementsByClassName('input').value = ''
            setTaskDescription('')
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('Access-Control-Allow-Origin', '*');
            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(tasks[index]),
            };
            fetch("http://localhost:3020/tasks/updateTask", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    readUserTasks()
                })
                .catch(error => console.log('error', error));
        }
    }

    function filterByStatus1() {
        let filterTasks = totalTasks.filter(t => t.status === 1)
        setTasks(filterTasks)
    }
    function filterByStatus0() {
        let filterTasks = totalTasks.filter(t => t.status === 0)
        setTasks(filterTasks)
    }
    function sortTasks(field, type) {
        let sortArr;
        if (type === 1) {
            sortArr = [].concat(tasks)
                .sort((a, b) => a[field] > b[field] ? 1 : -1)
        }
        else {
            sortArr = [].concat(tasks)
                .sort((a, b) => b[field] > a[field] ? 1 : -1)
        }
        setTasks(sortArr)
    }
    return (
        <>
            {tasks === undefined ? <></> :

                <div>
                    {tasks.length === 0 ? <h3>no tasks</h3> :
                        <>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <div className='col'>
                                        <ButtonGroup className='btg'>
                                            <Button className='bt' onClick={() => setTasks(totalTasks)}>Total Tasks</Button>
                                            <Button variant="secondary" >{tasks.length}</Button>
                                        </ButtonGroup>
                                    </div>
                                    <div className='col'>
                                        <ButtonGroup className='btg'>
                                            <Button className='bt' onClick={filterByStatus1}>Tasks Completed  </Button>
                                            <Button variant="secondary" >{tasks.filter(t => t.status === 1).length}</Button>
                                        </ButtonGroup>
                                    </div>
                                    <div className='col'>
                                        <ButtonGroup className='btg'>
                                            <Button className='bt' onClick={filterByStatus0}>Tasks Remaining  </Button>
                                            <Button variant="secondary" >{tasks.filter(t => t.status === 0).length}</Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                                <div className='row'>
                                    <table className="table table-striped">
                                        <thead className='header'>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Task Name <div>
                                                    <button onClick={() => sortTasks('task_name', 1)}>▲</button>
                                                    <button onClick={() => sortTasks('task_name', 0)}>▼</button>
                                                </div></th>
                                                <th scope="col">Description <div>
                                                    <button onClick={() => sortTasks('description', 1)}>▲</button>
                                                    <button onClick={() => sortTasks('description', 0)}>▼</button>
                                                </div></th>
                                                <th scope="col">Date <div>
                                                    <button onClick={() => sortTasks('status', 1)}>▲</button>
                                                    <button onClick={() => sortTasks('status', 0)}>▼</button>
                                                </div></th>
                                                <th scope="col">Update status <div>
                                                    <button onClick={() => sortTasks('status', 1)}>▲</button>
                                                    <button onClick={() => sortTasks('status', 0)}>▼</button>
                                                </div></th>
                                                <th scope="col">Delete</th>
                                                <th scope="col"><Button className="details" onClick={() => handleShow()}>Add new Task</Button></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tasks.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item.task_name}
                                                        <br></br>
                                                        <input className='input' onChange={(e) => setTaskTitle(e.target.value)}></input>
                                                        <button className="btn btn-primary" onClick={() => updateTask(index)} title='update' >update</button>
                                                    </td>
                                                    <td>{item.description}
                                                        <br></br>
                                                        <input className='input' onChange={(e) => setTaskDescription(e.target.value)}></input>
                                                        <button className="btn btn-primary" onClick={() => updateTaskDes(index)} title='update' >update</button>
                                                    </td>
                                                    <td>{item.due_Date}</td>
                                                    <td>
                                                        {item.status === 1 ? <button title='completed' className="btn btn-success btn-xs" onClick={() => updateStatusTask(index)} >completed</button>
                                                            : <button className="btn btn-danger btn-xs" onClick={() => updateStatusTask(index)} title='remaining'>remaining</button>}
                                                    </td>
                                                    <td><p title="delete"><button className="btn btn-danger btn-xs" onClick={() => deleteTask(index)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                    </svg><span className="glyphicon glyphicon-trash"></span></button></p></td>
                                                    <td></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </>}
                </div>}
            <Modal size='lg' show={show} onHide={handleClose} aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <h4>Add your task</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="name">Task Name</label>
                        <input type="text" className="form-control" id="name" onChange={(e) => setTaskTitle(e.target.value)} />
                        {/* {taskTitle === '' ? <span style={{ color: "red" }}>title of task is require</span> : ''} */}
                        <label htmlFor="name">Description</label>
                        <input type="text" className="form-control" id="name" onChange={(e) => setTaskDescription(e.target.value)} />
                        <label htmlFor="name">Task Date</label>
                        <DatePicker onChange={setTaskDate} value={taskDate} minDate={new Date()} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={addTask}>Add Task</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal size='lg' show={showE} onHide={handleCloseE} aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <h4>Error!</h4>
                </Modal.Header>
                <Modal.Body>
                    <h5>You can't delete task with due date less then 6 days from today.</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseE}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


