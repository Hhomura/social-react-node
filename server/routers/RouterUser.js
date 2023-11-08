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

  //router.post('/register', upload.single('profile'), (req, res) => {
router.post('/register', cpUpload, (req, res) => {
  //console.log(req.files.profile[0]);
  //console.log(req.files.background[0]);
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

router.get('/teste', auth, (req, res) =>{
  return res.json({msg: 'Opa'});
})


module.exports = router;