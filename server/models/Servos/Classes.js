const db = require('../../controller/Databse');

const classes = db.sequelize.define('classes', {
    classe:{
        type: db.Sequelize.STRING
    }
})

module.exports = classes;