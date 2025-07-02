const db = require('../../controller/Databse')
const series = require('../Series')

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
    },
    idFranquia: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'series',
            key: 'id'
        }
    }
})

servos.belongsTo(series, {foreignKey: 'idFranquia', allowNull: false});
servos.sync({force: true}).then(() =>{
    console.log("Tabela criada")
}).catch((error) =>{
    console.log("erro na criação da tabela")
})
//servos.sync({force:true})

module.exports = servos;