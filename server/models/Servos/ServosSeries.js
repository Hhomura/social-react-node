const db = require('../../controller/Databse');

const servos = require('./Servos');
const series = require('../Series');

const servos_series = db.sequelize.define('servos_series', {
    fkServo: {
        type: db.Sequelize.INTEGER,
        references:{
            model: 'servos',
            key: 'id'
        }
    },
    fkSeries: {
        type: db.Sequelize.INTEGER,
        references:{
            model: 'series',
            key: 'id'
        }
    }
})

servos.hasMany(servos_series, {foreignKey: 'fkServo'});
servos_series.belongsTo(servos, {foreignKey: 'fkServo'});
series.hasMany(servos_series, {foreignKey: 'fkSeries'});
servos_series.belongsTo(series,{foreignKey: 'fkSeries'});

//Verificar status de criação
servos.sync({force: true}).then(() =>{
    console.log("Tabela criada")
}).catch((error) =>{
    console.log("erro na criação da tabela")
})

module.exports = servos_series;

