const servo = require('../models/Servos/Servos')
const series = require('../models/Series')

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
    }

}