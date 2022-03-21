var mysql = require('mysql2');

const pool = mysql.createPool({
    user: "root",
    password: "eacl7720",
    database: "tasks"
})
let connection = pool.promise()

const executeStatement = async (query, listParams = []) => {
    const [results] = await connection.query(query, listParams)
    return results
}

module.exports = { executeStatement }