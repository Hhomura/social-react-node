const user = process.env.USER;
const password = process.env.PASSWORD;

const Sequelize = require('sequelize');
const sequelize =new Sequelize('nine_lives', user, password, {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports ={
    Sequelize: Sequelize,
    sequelize: sequelize,

    connectionTest: (() =>{
        sequelize.authenticate().then(() =>{
            console.log("Banco Conectado!")
        }).catch((error) =>{
            console.log("Erro: " + error);
        })
    })
}