const express = require('express');
const router = express.Router();
const userDTO = require('../controller/UserDTO');
const upload = require('../config/multer');
const auth = require('../helpers/AuthToken');


router.get('/', (req, res) => {
    res.send('User');
});

const cpUpload = upload.fields([
  { name: 'profile', maxCount: 1 },
  { name: 'background', maxCount: 1 }
]);

router.post('/register', cpUpload, (req, res) => {
     userDTO.addUser(req, res);
});

router.put('/update/:id', cpUpload, (req, res) => {
     userDTO.updateUser(req, res);
});

router.post('/login', (req, res) =>{
  userDTO.authUser(req, res);
})

router.get('/delete/:id', (req, res) =>{
  userDTO.deleteUser(req, res);
})

router.get('/get/:id', (req, res) =>{
  userDTO.getUser(req, res);
})

module.exports = router;