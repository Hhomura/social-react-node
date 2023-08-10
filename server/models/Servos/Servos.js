const db = require('../../controller/Databse')

const alinhamento = require('./Alinhamento');
const classe = require('./Classes');

const servos = db.sequelize.define('servos', {

    nome: {
        type: db.Sequelize.STRING
    },
    descricao: {
        type: db.Sequelize.STRING
    },
    profile:{
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
    genero:{
        type: db.Sequelize.STRING
    },
    altura:{
        type: db.Sequelize.DECIMAL
    },
    peso:{
        type: db.Sequelize.DECIMAL
    },
    fkAlinhamento:{
        type: db.Sequelize.INTEGER,
        references:{
            model: 'alinhamento',
            key: 'id'
        }
    },

    fkClasse:{
        type: db.Sequelize.INTEGER,
        references:{
            model: 'classes',
            key: 'id'
        }
    }
})

servos.belongsTo(alinhamento, {foreignKey: 'fkAlinhamento'})
servos.belongsTo(classe, {foreignKey: 'fkClasse'})

module.exports = servos;