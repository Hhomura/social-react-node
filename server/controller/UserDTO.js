const user = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs')

function convertURL(url) {
  if (url != null) {
    const convertedURL = url.replace(/\\/g, '/');
    return convertedURL;
  }
  return '';
}

module.exports = {

  addUser: (req, res) => {
    var pathProfile = '';
    var pathBackground = '';

    if (req.files['profile']) {
      pathProfile = req.files['profile'][0].path;
    }
    if (req.files['background']) {
      pathBackground = req.files['background'][0].path;
    }

    const senhaHash = req.body.password;

    bcrypt.genSalt(10, (erro, salt) => {
      bcrypt.hash(senhaHash, salt, (erro, hash) => {
        if (erro) {
          console.log(`Erro ao gerar hash: ${erro}`);
          return;
        }
        const senha = hash;
        user.create({
          nome: req.body.nome,
          apelido: req.body.apelido,
          email: req.body.email,
          password: senha,
          descricao: req.body.descricao,
          profile_url: pathProfile,
          background: pathBackground,
          adm: req.body.adm
        })
          .then(() => {
            res.status(200).json({ msg: "Usuário Registrado" })
          })
          .catch((error) => {
            res.status(401).json("Erro no cadastro: " + error);
          });
      });
    });
  },

  deleteUser: (req, res) => {

    user.findOne({ where: { id: req.params.id } }).then((userUpdate) => {
      if (userUpdate.profile_url != '') {
        fs.unlinkSync(convertURL(userUpdate.profile_url))
      }
      if (userUpdate.background != '') {
        fs.unlinkSync(convertURL(userUpdate.background))
      }
    }).catch((error) => {
      console.log(error)
    })

    user.destroy({ where: { id: req.params.id } }).then(() => {
      res.status(200).json({ msg: "Usuário Deletado com Sucesso!" })
    }).catch((error) => {
      res.status(400).json({ msg: 'Error ao Deletar Usuário: ' + error })
    })
  }
  ,

  authUser: (req, res) => {
    user.findOne({ where: { email: req.body.email } },)
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, (erro, batem) => {
            if (batem) {
              console.log("É o mesmo usuário!")
              //res.status(200).json({msg: "MESMO USUÀRIO"});
              res.json({
                id: user.id,
                nome: user.nome,
                apelido: user.apelido,
                //email: user.email,
                descricao: user.descricao,
                profile: user.profile_url,
                background: user.background,
                adm: user.adm,
                token: jwt.sign({ id: user.id, email: user.email }, process.env.SECRET), msg: "Usuário Autenticado com Sucesso!"
              });
            } else {
              res.status(401).json({ error: "Senha Incorreta!" });
            }
          })
        } else {
          res.status(401).json({ error: "Usuário Não Encontrado!" });
        }
      })
      .catch((error) => {
        res.status(401).json({ error: "Erro Interno!" });
      });
  },


  updateUser: (req, res) => {

    var pathProfile = '';
    var pathBackground = '';
    var profile = req.body.profile;
    var background = req.body.background;

    console.log(req.body)

    if (req.files['profile']) {
      pathProfile = req.files['profile'][0].path;
    }
    if (req.files['background']) {
      pathBackground = req.files['background'][0].path;
    }

    user.findOne({ where: { id: req.params.id } }).then((userUpdate) => {
      if (userUpdate.profile_url != '' && req.body.profile == 'removeu' ||
      userUpdate.profile_url != '' && pathProfile != ""){
        fs.unlinkSync(convertURL(userUpdate.profile_url))
      }
      if (userUpdate.background != '' && req.body.background == 'removeu' ||
      userUpdate.background != '' && pathBackground != "") {
        fs.unlinkSync(convertURL(userUpdate.background))
      }
    }).catch((error) => {
      console.log(error)
    })

    if(profile == 'removeu') profile = ''
    if(background == 'removeu') background = ''

    user.update({
      nome: req.body.nome,
      apelido: req.body.apelido,
      descricao: req.body.descricao,
      profile_url: pathProfile != '' ? pathProfile : profile,
      background: pathBackground != '' ? pathBackground : background
    }, { where: { id: req.params.id } }).then((data) => {

      res.status(200).json({ user: data, msg: "Atualizou com sucesso todos os dados" })
    }).catch((error) => {
      res.status(400).json({ msg: 'Error: ' + error })
    })

  }
}
