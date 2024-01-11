const series = require('../models/Series')

module.exports = {

    addSerie: ((req, res) =>{
        var pathProfile = ''
        var pathBackground = ''

        if(req.files['profile_series']){
            pathProfile = req.files['profile_series'][0].path
        }
        if(req.files['background_series']){
            pathBackground = req.files['background_series'][0].path
        }

        series.create({
            nome: req.body.nome,
            descricao: req.body.descricao,
            dt_origem: req.body.ano,
            profile: pathProfile,
            background: pathBackground 
        }).then(() =>{
            res.status(200).json({ msg: "Franquia Registrada" })
        }).catch((error) =>{
            res.status(401).json("Erro no cadastro: " + error);
        })
    }),

    getAll: ((req, res) =>{
        series.findAll().then((data) =>{
            res.status(200).json({ msg: "Franquia Registrada", data: data})
        }).catch((error) =>{
            res.status(401).json("Erro na busca: " + error);
        })
    }),

    getOne: ((req, res) =>{
        series.findOne({where: {id: req.params.id}}).then((data) =>{
            res.status(200).json({data: data})
        }).catch((error) =>{
            console.log(error)
        })
    })
}