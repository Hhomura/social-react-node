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

user.sync({force: true}).then(() =>{
    console.log("Tabela criada")
}).catch((error) =>{
    console.log("erro na criação da tabela")
})

//user.sync({alter:true})

module.exports = user;