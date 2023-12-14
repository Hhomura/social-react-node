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

router.post('/register', cpUpload, (req,res) =>{
    servoDTO.addServo(req, res);
})

module.exports = router;