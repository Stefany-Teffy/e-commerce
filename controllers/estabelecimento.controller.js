const db = require("../models");
const Estabelecimento = db.Estabelecimento;
const Op = db.Sequelize.Op;

// Cria e salva um novo estabelecimento
exports.create = (req, res) => {
  // Validar requisição. Aqui verificamos se algum parâmetro está vazio
  if (!req.body.cnpj) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!",
    });
    return;
  }

  // Criar um estabelecimento
  const estabelecimento = {
    cnpj: req.body.cnpj,
    nome: req.body.nome,
    endereco: req.body.endereco,
    telefone: req.body.telefone,
    email: req.body.email,
    horario_abertura: req.body.horario_abertura,
    horario_fechamento: req.body.horario_fechamento,
  };

  // Salvar estabelecimento no banco de dados
  Estabelecimento.create(estabelecimento)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a criação do Estabelecimento.",
      });
    });
};

// Retorna todos os estabelecimentos  do banco de dados. Podemos passar um parâmetro e filtrar
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Estabelecimento.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a procura por Estabelecimento.",
      });
    });
};

// Encontra um estabelecimento pelo cnpj
exports.findOne = (req, res) => {
  const id = req.params.id;

  Estabelecimento.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível achar Estabelecimento com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro na busca por Estabelecimento via id=" + id,
      });
    });
};

// Atualiza os dados de um estabelecimento
exports.update = (req, res) => {
  const id = req.params.id;

  Estabelecimento.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Estabelecimento foi atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi possível atualizar Estabelecimento com id=${id}. Talvez estabelecimento não tenha sido encontrada ou req.body está vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar o Estabelecimento via id=" + id,
      });
    });
};

// Deleta um estabelecimento pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Estabelecimento.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Estabelecimento foi deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível deletar esse Estabelecimento; Ele não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não é possível deletar Estabelecimento com id=" + id,
      });
    });
};

// Deleta todos os Estabelecimentos do banco de dados
exports.deleteAll = (req, res) => {
  Estabelecimento.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Estabelecimentos foram deletadas com sucesso!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro enquanto deletava Estabelecimentos.",
      });
    });
};
