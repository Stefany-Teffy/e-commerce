const db = require("../models");
const Tipo = db.Tipo;
const Op = db.Sequelize.Op;

// Cria e salva um novo tipo
exports.create = (req, res) => {
  // Validar requisição. Aqui verificamos se algum parâmetro está vazio
  if (!req.body.nome || !req.body.descricao) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!",
    });
    return;
  }

  // Criar um  tipo
  const tipo = {
    nome: req.body.nome,
    descricao: req.body.descricao,
  };

  // Salvar tipos no banco de dados
  Tipo.create(tipo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a criação do Tipo.",
      });
    });
};

// Retorna todos os tipos  do banco de dados. Podemos passar um parâmetro e filtrar
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Tipo.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a procura por Tipo.",
      });
    });
};

// Encontra um tipo pelo id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tipo.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível achar tipo com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro na busca por Tipo via id=" + id,
      });
    });
};

// Atualiza os dados de um tipo
exports.update = (req, res) => {
  const id = req.params.id;

  Tipo.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tipo foi atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi possível atualizar Tipo com id=${id}. Talvez tipo não tenha sido encontrada ou req.body está vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar o Tipo via id=" + id,
      });
    });
};

// Deleta um tipo pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Tipo.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tipo foi deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível deletar esse tipo; Ele não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não é possível deletar Tipo com id=" + id,
      });
    });
};

// Deleta todos os Tipos do banco de dados
exports.deleteAll = (req, res) => {
  Tipo.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tipos foram deletados com sucesso!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro enquanto deletava Tipos.",
      });
    });
};
