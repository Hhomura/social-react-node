const express = require('express')
const router = express.Router();
const seriesDTO = require('../controller/SeriesDTO')
const upload = require ('../config/multer')

const cpUpload = upload.fields([
    {name: 'profile_series', maxCount: 1},
    {name: 'background_series', maxCount: 1}
])

router.post('/register', cpUpload, (req, res) =>{
    seriesDTO.addSerie(req, res);
})
router.get('/', (req, res) =>{
    res.send('Series');
})

module.exports = router;