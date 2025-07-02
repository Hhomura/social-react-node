const db = require('../controller/Databse');

const series = db.sequelize.define('series', {
    nome: {
        type: db.Sequelize.STRING
    },
    descricao:{
        type: db.Sequelize.TEXT
    },
    dt_origem:{
        type: db.Sequelize.DATE
    },
    profile:{
        type: db.Sequelize.STRING
    },
    background:{
        type: db.Sequelize.STRING
    }
})

series.sync({force: true}).then(() =>{
    console.log("Tabela criada")
}).catch((error) =>{
    console.log("erro na criação da tabela")
})
//series.sync({force: true})

module.exports = series;