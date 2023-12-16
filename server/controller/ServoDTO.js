const servo = require('../models/Servos/Servos')

module.exports = {

    addServo: (req, res) =>{
        var pathFoto = '';

        if(req.files['servo_profile']){
            pathFoto = req.files['servo_profile'][0].path;
        }

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
            descricao: req.body.descricao,
            fantasma_nobre: req.body.fantasma_nobre
        }).then(() =>{
            res.status(200).json({ msg: "Servo Registrado" })
          })
          .catch((error) => {
            res.status(401).json("Erro no cadastro: " + error);
          });
    },
    
    getAllServo: (req, res) =>{
        servo.findAll().then((data) =>{
            res.status(200).json({ msg: "Servo Registrado", data: data })
        }).catch((error) =>{
            console.log(error)
        })
    }

}