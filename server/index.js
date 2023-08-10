require('dotenv').config(); 
const cors = require('cors')
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT;
//Databese
const db = require('./controller/Databse');

//CORS
app.use(cors());
app.use(express.json());

//Rotas
const servoR = require('./routers/RouterServo')
const seriesR = require('./routers/RouterSeries')
const admR = require('./routers/RouterAdm')
const userR = require('./routers/RouterUser')

//Rota de Imagens profile e backgrounds 
app.use('/files', express.static(path.resolve(__dirname)));

app.use('/servos', servoR);
app.use('/series', seriesR);
app.use('/adm', admR);
app.use('/user', userR);
//Rota das Imagens
app.use('/profile', express.static(path.resolve(__dirname)));
app.use('/background', express.static(path.resolve(__dirname)));
//Home
app.get('/', (req, res) =>{
    res.send("<h1> Home Page Servidor </h1>")
})

//Teste de Conexão com Banco de Dados
db.connectionTest();
app.listen(PORT, (req, res) =>{
    console.log(`Serviodr Rodando na Porta: ${PORT}`);
})