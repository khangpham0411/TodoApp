const db = require("../db/database");

//CREATE DB
exports.createDB = (req, res) => {
    let q = 'CREATE DATABASE todolist';
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("DB created");
    })
}

//CREATE TABLE
exports.createTable = (req, res) => {
    let q = 'CREATE TABLE todos(id int AUTO_INCREMENT, firstName VARCHAR(255), lastName VARCHAR(255), assignment VARCHAR(255), latestUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, status VARCHAR(255) DEFAULT "Unfinished" ,PRIMARY KEY(id))';
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("Table created");
    })
}

//CREATE LIST
exports.createList = (req, res) => {
    let q = 'INSERT INTO todos SET ?';
    
    const { firstName, lastName, assignment } = req.body;

    db.query(q, {firstName, lastName, assignment}, (err, result) => {
        if (err) throw err;
        return res.status(201).json(result);
    })
}

//SHOW TODOS
exports.showTodos = (req, res) => {
    let q = 'SELECT * FROM todos';
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
}

//SHOW SINGLE TODO
exports.singleTodo = (req, res) => {
    let q = `SELECT * FROM todos WHERE id=${req.params.id}`;
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(200).json(result[0]);
    })
}

//UPDATE TODO
exports.updateTodo = (req, res) => {
    const { id, firstName, lastName, assignment, status } = req.body;
    const latestUpdated = new Date()
    
    let q = `UPDATE todos SET ? WHERE id=${req.params.id}`;
    let q1 = 'INSERT INTO history SET ?';
    db.query(q, {firstName, lastName, assignment, status, latestUpdated}, (err, result) => {
        db.query(q1,{id, firstName, lastName, assignment, latestUpdated, status})
        if (err) throw err;
        return res.status(200).json(result);
    })
}

//DELETE SINGLE TODO
exports.deleteSingleTodo = (req, res) => {
    let q = `DELETE FROM todos WHERE id=${req.params.id}`;
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(200).json({data: "todo deleted"});
    })
}

// CREATE TABLE HISTORY
exports.createHistory = (req,res) => {
    let q ='CREATE TABLE history(id int, firstName VARCHAR(255), lastName VARCHAR(255), assignment VARCHAR(255), latestUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, status VARCHAR(255) )';
    db.query(q, (err,result) => {
        if (err) throw err;
        return res.status(201).json("Table created");
    })
}

//INSERT UPDATE
exports.insertUpdate = (req, res) => {
    let q = 'INSERT INTO history SET ?';
    
    const { id, firstName, lastName, assignment, status} = req.body;

    const latestUpdated = new Date()
    db.query(q, {id, firstName, lastName, assignment, latestUpdated, status}, (err, result) => {
        if (err) throw err;
        return res.status(201).json(result);
    })
}

//SHOW SINGLE HISTORY
exports.singleHistory = (req, res) => {
    let q = `SELECT * FROM history WHERE id=${req.params.id}`;
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
}

//SHOW HISTORY
exports.showHistory = (req, res) => {
    let q = 'SELECT * FROM history';
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
}


