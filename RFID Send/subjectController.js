const db = require('./db')

exports.getSubject = (req, res) => {
    const q = `SELECT * FROM subjects where subject_code = '${req.params.subject}'`

    db.query(q, (err, result) => {
        if(err) {
            return res.status(400).json({
                message: 'Error querying the database',
                error: err
            })
        }

        return res.status(200).json({
            message: 'Successful',
            result
        })
    })
}

exports.getAllSubjects = (req, res) => {
    const q = 'SELECT * from subjects'

    db.query(q, (err, results) => {
        if(err) return res.status(400).json({
            message: 'Error querying the database',
            error: err
        })

        return res.status(200).json({
            message: 'Successful',
            results
        })
    })
}

exports.getSubjectAttendees = (req, res) => {
    const q = `SELECT a.student_name as student_name, a.student_course as student_course, a.student_year as student_year, b.status as status from students a, attendance b where b.subject_code = "${req.params.subject}" and b.date = "${req.params.date}" and a.id = b.student_id`
    db.query(q, (err, results) => {
        if(err) return res.status(400).json({
            message: 'Error retrieving row in the database',
            error: err
        })

        return res.status(200).json({
            message: 'Successful',
            results
        })
    })
}

exports.getSubjectEnrollees = (req, res) => {
    const q = `SELECT * from students, subject_student where subject_code = "${req.params.subject}" and students.id = subject_student.student_id`
    
    db.query(q, (err, results) => {
        
        if(err) return res.status(400).json({
            message: 'Error retrieving row in the database',
            error: err
        })

        return res.status(200).json({
            message: 'Successful',
            results
        })
    })
}


exports.addSubjectEnrollee = (req, res) => {
    const q = `INSERT INTO subject_student (student_id, subject_code) VALUES ('${req.body.student}','${req.params.subject}')`
    db.query(q, (err, results) => {
        if(err) return res.status(400).json({
            message: 'Error inserting row in the database',
            error: err
        })

        return res.status(200).json({
            message: 'Successful',
            results
        })
    })
}