const db = require('../controller/Databse');

const user = db.sequelize.define('users',{
    nome:{
        type: db.Sequelize.STRING
    },
    apelido: {
        type: db.Sequelize.STRING
    },
    email:{
        type: db.Sequelize.STRING
    },
    password: {
        type: db.Sequelize.STRING
    }
    ,
    descricao:{
        type: db.Sequelize.TEXT
    },
    profile_url:{
        type: db.Sequelize.STRING
    },
    background:{
        type: db.Sequelize.STRING
    },
    adm:{
        type: db.Sequelize.TINYINT
    }
})

//user.sync({force:true})

module.exports = user;