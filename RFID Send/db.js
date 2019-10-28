const mysql = require('mysql')
const db = mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'rfid'
})

db.connect((err) => {
    if(err) throw err
    console.log('Database connected')
})

module.exports = db