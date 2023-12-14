const db = require('../../controller/Databse')

const servos = db.sequelize.define('servos', {
    nome: {
        type: db.Sequelize.STRING
    },
    descricao: {
        type: db.Sequelize.STRING
    },
    foto:{
        type: db.Sequelize.STRING
    },
    pais:{
        type: db.Sequelize.STRING
    },
    mitologia:{
        type: db.Sequelize.STRING
    },
    especie:{
        type: db.Sequelize.STRING
    },
    altura:{
        type: db.Sequelize.STRING
    },
    peso:{
        type: db.Sequelize.STRING
    },
    alinhamento:{
        type: db.Sequelize.STRING,
    },
    classe:{
        type: db.Sequelize.STRING,
    },
    fantasma_nobre:{
        type: db.Sequelize.STRING,
    }
})

//servos.sync({force:true})

module.exports = servos;