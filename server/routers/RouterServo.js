const express = require('express')
const router = express.Router();
const upload = require('../config/multer')
const servoDTO = require('../controller/ServoDTO')

const cpUpload = upload.fields([
    {name: 'servo_profile', maxCount: 1}
])

router.get('/', (req, res) =>{
    res.send('Goku');
})

router.get('/getAllServos', (req, res) =>{
    servoDTO.getAllServo(req, res);
})

router.get('/getOne/:nome', (req, res) =>{
    servoDTO.getOne(req, res);
})

router.post('/register', cpUpload, (req,res) =>{
    servoDTO.addServo(req, res);
})

module.exports = router;