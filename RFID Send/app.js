const express = require('express')
const cors = require('cors')
const subjectRouter = require('./subjectRouter')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use('/subjects', subjectRouter)

app.use((req, res) => {
    res.status(404).json({
        message: 'Not Found'
    })
})
module.exports = app

