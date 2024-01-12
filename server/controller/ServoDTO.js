const servo = require('../models/Servos/Servos')
const series = require('../models/Series');
const servos = require('../models/Servos/Servos');
const fs = require('fs');
const Utils = require('../Utils');

module.exports = {

    addServo: (req, res) => {
        var pathFoto = '';
        var idSerie;

        if (req.files['servo_profile']) {
            pathFoto = req.files['servo_profile'][0].path;
        }

        series.findOne({ where: { nome: req.body.series } }).then((data) => {
            console.log("Data: " + data)
            idSerie = data.id;

            servo.create({
                nome: req.body.nome,
                foto: pathFoto,
                pais: req.body.pais,
                especie: req.body.especie,
                altura: req.body.altura,
                peso: req.body.peso,
                alinhamento: req.body.alinhamento,
                classe: req.body.classe,
                mitologia: req.body.mitologia,
                idFranquia: idSerie,
                descricao: req.body.descricao,
                fantasma_nobre: req.body.fantasma_nobre
            }).then(() => {
                res.status(200).json({ msg: "Servo Registrado" })
            })
                .catch((error) => {
                    res.status(401).json("Erro no cadastro: " + error);
                });

        }).catch((error) => {
            console.log(error)
        })
    },

    getAllServo: (req, res) => {
        servo.findAll().then((data) => {
            res.status(200).json({ msg: "Servo Registrado", data: data })
        }).catch((error) => {
            console.log(error)
        })
    },

    updateServo: (req, res) => {
        var pathFoto = ''
        var idSerie

        var foto = req.body.servo_profile

        if (req.files['servo_profile']) {
            pathFoto = req.files['servo_profile'][0].path;
        }

        servo.findOne({ where: { id: req.params.id } }).then((servoUpdate) => {
            if (servoUpdate.foto != '' && req.body.servo_profile == 'removeu' || servoUpdate.foto != '' && pathFoto != "") {
                fs.unlinkSync(Utils.convertUrl(servoUpdate.foto))
            }
        })

        if (foto == 'removeu') foto = ''

        series.findOne({ where: { nome: req.body.series } }).then((data) => {
            console.log("Data: " + data)
            idSerie = data.id;

            servo.update({
                nome: req.body.nome,
                foto: pathFoto != '' ? pathFoto : foto,
                pais: req.body.pais,
                especie: req.body.especie,
                altura: req.body.altura,
                peso: req.body.peso,
                alinhamento: req.body.alinhamento,
                classe: req.body.classe,
                mitologia: req.body.mitologia,
                idFranquia: idSerie,
                descricao: req.body.descricao,
                fantasma_nobre: req.body.fantasma_nobre
            }, { where: { id: req.params.id } }).then(() => {
                res.status(200).json({ msg: "Servo Atualizado" })
            })
                .catch((error) => {
                    res.status(401).json("Erro na Atualização: " + error);
                });

        }).catch((error) => {
            console.log(error)
        })


    },

    getOne: (req, res) => {
        servos.findOne({ where: { nome: req.params.nome } }).then((data) => {
            res.status(200).json({ data: data })
        }).catch((error) => {
            console.log(error)
        })
    }
    ,
    deleteServo: (req, res) =>{
        servo.findOne({where: {id: req.params.id}}).then((servoDelete) =>{
            if(servoDelete.foto != ''){
                fs.unlinkSync(Utils.convertUrl(servoDelete.foto))
            }

            servo.destroy({where: {id: req.params.id}}).then(() =>{
                res.status(200).json({msg: 'Servo deletado com sucesso!'})
            }).catch((error) =>{
                res.status(400).json({msg: "Erro ao deletar servo: "+error})
            })

        }).catch((error) =>{
            console.log(error)
        })
    }
}