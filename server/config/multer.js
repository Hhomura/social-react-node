const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: ((req, file, cb) =>{
        //console.log(req.files.profile[0].fieldname)
        //console.log(req.files)
        //console.log(file)

        console.log(req[0])

        if(file.fieldname == "profile"){
            cb(null, './public/uploads/profile');
        }
        if(file.fieldname == "background"){
            cb(null, './public/uploads/background');
        }
    }),
    filename: ((req, file, cb) =>{

        if(file.fieldname == "profile"){
            cb(null, Date.now()+"Profile" + path.extname(file.originalname));   
        }
        if(file.fieldname == "background"){
            cb(null, Date.now()+"Background" + path.extname(file.originalname));
        }

    })
});

const upload = multer({storage});

module.exports = upload;