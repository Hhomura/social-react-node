const user = require('../models/User');
const bcrypt = require('bcryptjs');
const { use } = require('../routers/RouterUser');
const jwt = require('jsonwebtoken');
const fs = require('fs')

function convertURL(url) {
  // Usa a função replace com uma expressão regular para substituir os caracteres de escape.
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

        if (pathProfile && pathBackground) {

          if (req.body.removeuBackground == 'true' && req.body.removeuProfile == 'true') {
            user.create({
              nome: req.body.nome,
              apelido: req.body.apelido,
              email: req.body.email,
              password: senha,
              descricao: req.body.descricao,
              profile_url: '',
              background: '',
              adm: req.body.adm
            })
              .then(() => {
                res.status(200).json({ msg: "Usuário Registrado" })
              })
              .catch((error) => {
                res.status(401).json("Erro no cadastro: " + error);
              });
          }

          if (req.body.removeuBackground == 'false' && req.body.removeuProfile == 'false') {
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
          }

          if (req.body.removeuBackground == 'false' && req.body.removeuProfile == 'true') {
            user.create({
              nome: req.body.nome,
              apelido: req.body.apelido,
              email: req.body.email,
              password: senha,
              descricao: req.body.descricao,
              profile_url: '',
              background: pathBackground,
              adm: req.body.adm
            })
              .then(() => {
                res.status(200).json({ msg: "Usuário Registrado" })
              })
              .catch((error) => {
                res.status(401).json("Erro no cadastro: " + error);
              });
          }

          if (req.body.removeuBackground == 'true' && req.body.removeuProfile == 'false') {
            user.create({
              nome: req.body.nome,
              apelido: req.body.apelido,
              email: req.body.email,
              password: senha,
              descricao: req.body.descricao,
              profile_url: pathProfile,
              background: '',
              adm: req.body.adm
            })
              .then(() => {
                res.status(200).json({ msg: "Usuário Registrado" })
              })
              .catch((error) => {
                res.status(401).json("Erro no cadastro: " + error);
              });
          }

        } else if (pathBackground = '' && pathProfile) {

          if (req.body.removeuProfile == 'true') {
            user.create({
              nome: req.body.nome,
              apelido: req.body.apelido,
              email: req.body.email,
              password: senha,
              descricao: req.body.descricao,
              profile_url: '',
              background: '',
              adm: req.body.adm
            })
              .then(() => {
                res.status(200).json({ msg: "Usuário Registrado Sem Background" })
              })
              .catch((error) => {
                res.status(401).json("Erro no cadastro: " + error);
              });
          }

          if (req.body.removeuProfile == 'false') {
            user.create({
              nome: req.body.nome,
              apelido: req.body.apelido,
              email: req.body.email,
              password: senha,
              descricao: req.body.descricao,
              profile_url: pathProfile,
              background: '',
              adm: req.body.adm
            })
              .then(() => {
                res.status(200).json({ msg: "Usuário Registrado Sem Background" })
              })
              .catch((error) => {
                res.status(401).json("Erro no cadastro: " + error);
              });
          }

        } else if (pathBackground && pathProfile == '') {

          if (req.body.removeuBackground == 'true') {
            user.create({
              nome: req.body.nome,
              apelido: req.body.apelido,
              email: req.body.email,
              password: senha,
              descricao: req.body.descricao,
              profile_url: '',
              background: '',
              adm: req.body.adm
            })
              .then(() => {
                res.status(200).json({ msg: "Usuário Registrado Sem Profile" })
              })
              .catch((error) => {
                res.status(401).json("Erro no cadastro: " + error);
              });
          }
          if (req.body.removeuProfile == 'false') {
            user.create({
              nome: req.body.nome,
              apelido: req.body.apelido,
              email: req.body.email,
              password: senha,
              descricao: req.body.descricao,
              profile_url: '',
              background: pathBackground,
              adm: req.body.adm
            })
              .then(() => {
                res.status(200).json({ msg: "Usuário Registrado Sem Profile" })
              })
              .catch((error) => {
                res.status(401).json("Erro no cadastro: " + error);
              });
          }

        } else {

          user.create({
            nome: req.body.nome,
            apelido: req.body.apelido,
            email: req.body.email,
            password: senha,
            descricao: req.body.descricao,
            profile_url: '',
            background: '',
            adm: req.body.adm
          })
            .then(() => {
              res.status(200).json({ msg: "Usuário Registrado Sem fotos" })
            })
            .catch((error) => {
              res.status(401).json("Erro no cadastro: " + error);
            });
        }
      });
    });
  },

  deleteUser: (req, res) => {
    user.destroy({where: {id: req.params.id}}).then(() =>{
      res.status(200).json({msg: "Usuário Deletado com Sucesso!" })
    }).catch((error) =>{
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
                email: user.email,
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

    console.log(req.body)

    if (req.files['profile']) {
      pathProfile = req.files['profile'][0].path;
    }
    if (req.files['background']) {
      pathBackground = req.files['background'][0].path;
    }

    console.log("Profile: " + pathProfile)
    console.log("Background: " + pathBackground)
    console.log(req.body.removeuProfile)
    console.log(req.body.removeuBackground)

    if (pathBackground && pathProfile) {

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

      user.update({
        nome: req.body.nome,
        apelido: req.body.apelido,
        descricao: req.body.descricao,
        profile_url: pathProfile,
        background: pathBackground
      }, { where: { id: req.params.id } }).then((data) => {

        res.status(200).json({ user: data, msg: "Atualizou com sucesso todos os dados" })
      }).catch((error) => {
        res.status(400).json({ msg: 'Error: ' + error })
      })

    }

    //Se não Alterou Foto de BAckground
    else if (pathBackground == '' && pathProfile) {

      if (req.body.removeuBackground == 'true') {

        //Apagar Antigo profile e Remover Background
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

        user.update({
          nome: req.body.nome,
          apelido: req.body.apelido,
          descricao: req.body.descricao,
          profile_url: pathProfile,
          background: ''
        }, { where: { id: req.params.id } }).then((data) => {
          res.status(200).json({ user: data, msg: "Salvo com sucesso, removeu background" })
        }).catch((error) => {
          res.status(400).json({ msg: 'Error: ' + error })
        })
      }
      if (req.body.removeuBackground == 'false') {

        //Apagar Antigo profile
        user.findOne({ where: { id: req.params.id } }).then((userUpdate) => {
          if (userUpdate.profile_url != '') {
            fs.unlinkSync(convertURL(userUpdate.profile_url))
          }
        }).catch((error) => {
          console.log(error)
        })

        user.update({
          nome: req.body.nome,
          apelido: req.body.apelido,
          descricao: req.body.descricao,
          profile_url: pathProfile,
        }, { where: { id: req.params.id } }).then((data) => {
          res.status(200).json({ user: data, msg: "Salvo com sucesso, não alterou background" })
        }).catch((error) => {
          res.status(400).json({ msg: 'Error: ' + error })
        })
      }
      //Se não Alterou Foto de Perfil
    } else if (pathBackground && pathProfile == '') {

      if (req.body.removeuProfile == 'true') {

        //REMOVER profile e Apagar antigo Background
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

        user.update({
          nome: req.body.nome,
          apelido: req.body.apelido,
          descricao: req.body.descricao,
          background: pathBackground,
          profile_url: ''
        }, { where: { id: req.params.id } }).then((data) => {
          res.status(200).json({ user: data, msg: "Salvo com sucesso, removeu profile" })
        }).catch((error) => {
          res.status(400).json({ msg: 'Error: ' + error })
        })
      }
      if (req.body.removeuProfile == 'false') {

        //Apagar Antigo profile e Remover Background
        user.findOne({ where: { id: req.params.id } }).then((userUpdate) => {
          if (userUpdate.background != '') {
            fs.unlinkSync(convertURL(userUpdate.background))
          }
        }).catch((error) => {
          console.log(error)
        })

        user.update({
          nome: req.body.nome,
          apelido: req.body.apelido,
          descricao: req.body.descricao,
          background: pathBackground
        }, { where: { id: req.params.id } }).then((data) => {
          res.status(200).json({ user: data, msg: "Salvo com sucesso, não alterou profile" })
        }).catch((error) => {
          res.status(400).json({ msg: 'Error: ' + error })
        })
      }

      //Se não Alterou Ambas as Fotos
    } else if (pathBackground == '' && pathProfile == '') {

      if (req.body.removeuProfile == 'true' && req.body.removeuBackground == 'true') {

        //Apagar Antigo profile e Remover Background
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

        user.update({
          nome: req.body.nome,
          apelido: req.body.apelido,
          descricao: req.body.descricao,
          background: '',
          profile_url: ''
        }, { where: { id: req.params.id } }).then((data) => {
          console.log(data)
          res.status(200).json({ user: data, msg: "Atualizou com Sucesso, Removeu As duas imagens" })
        }).catch((error) => {
          res.status(400).json({ msg: 'Error: ' + error })
        })
      }

      if (req.body.removeuProfile == 'false' && req.body.removeuBackground == 'false') {
        user.update({
          nome: req.body.nome,
          apelido: req.body.apelido,
          descricao: req.body.descricao,
        }, { where: { id: req.params.id } }).then((data) => {
          console.log(data)
          res.status(200).json({ user: data, msg: "Atualizou com Sucesso, Não Removeu nenhuma imagem" })
        }).catch((error) => {
          res.status(400).json({ msg: 'Error: ' + error })
        })
      }

      if (req.body.removeuProfile == 'false' && req.body.removeuBackground == 'true') {

        //Remover Background
        user.findOne({ where: { id: req.params.id } }).then((userUpdate) => {
          if (userUpdate.background != '') {
            fs.unlinkSync(convertURL(userUpdate.background))
          }
        }).catch((error) => {
          console.log(error)
        })

        user.update({
          nome: req.body.nome,
          apelido: req.body.apelido,
          descricao: req.body.descricao,
          background: '',
        }, { where: { id: req.params.id } }).then((data) => {
          console.log(data)
          res.status(200).json({ user: data, msg: "Atualizou com Sucesso, Removeu Apenas Background, Não alterou Profile" })
        }).catch((error) => {
          res.status(400).json({ msg: 'Error: ' + error })
        })
      }
      if (req.body.removeuProfile == 'true' && req.body.removeuBackground == 'false') {

        //Apagar Antigo profile e Remover Background
        user.findOne({ where: { id: req.params.id } }).then((userUpdate) => {

          if (userUpdate.profile_url != '') {
            fs.unlinkSync(convertURL(userUpdate.profile_url))
          }
        }).catch((error) => {
          console.log(error)
        })

        user.update({
          nome: req.body.nome,
          apelido: req.body.apelido,
          descricao: req.body.descricao,
          profile_url: ''
        }, { where: { id: req.params.id } }).then((data) => {
          console.log(data)
          res.status(200).json({ user: data, msg: "Atualizou com Sucesso, Removeu Apenas Profile, não alterou Background" })
        }).catch((error) => {
          res.status(400).json({ msg: 'Error: ' + error })
        })
      }

    }
  }
}
