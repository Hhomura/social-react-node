const db = require('../../controller/Databse')

const alinhamento = db.sequelize('alinhamento',{
    alinhamento:{
        type: db.Sequelize.STRING
    }
})

module.exports = alinhamento;