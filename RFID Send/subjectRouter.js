const express = require('express')
const router = express.Router()
const subjectController = require('./subjectController')

router.get('/', subjectController.getAllSubjects)
router.get('/:subject', subjectController.getSubject)

router.get('/:subject/attendees/:date', subjectController.getSubjectAttendees)
router.get('/:subject/students', subjectController.getSubjectEnrollees)
router.post('/:subject/students', subjectController.addSubjectEnrollee)

module.exports = router