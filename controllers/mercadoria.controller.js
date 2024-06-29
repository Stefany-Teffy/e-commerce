const db = require("../models");
const Mercadoria = db.Mercadoria;
const Op = db.Sequelize.Op;

// Cria e salva uma nova mercadoria
exports.create = (req, res) => {
  // Validar requisição. Aqui verificamos se algum parâmetro está vazio
  if (!req.body.nome) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!",
    });
    return;
  }

  // Criar uma mercadoria
  const mercadoria = {
    nome: req.body.nome,
    descricao: req.body.descricao,
    preco: req.body.preco,
    quantidade_estoque: req.body.quantidade_estoque,
    data_adicao: req.body.data_adicao,
    estabelecimento_id: req.body.estabelecimento_id,
    };

  // Salvar mercadoria no banco de dados
  Mercadoria.create(mercadoria)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a criação da mercadoria.",
      });
    });
};

// Retorna todos as mercadorias do banco de dados. Podemos passar um parâmetro e filtrar
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Mercadoria.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a procura por mercadoria.",
      });
    });
};

// Encontra uma mercadoria pelo id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Mercadoria.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível achar Mercadoria com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro na busca por Mercadoria via id=" + id,
      });
    });
};

// Atualiza os dados de uma mercadoria
exports.update = (req, res) => {
  const id = req.params.id;

  Mercadoria.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Mercadoria foi atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi possível atualizar Mercadoria com id=${id}. Talvez mercadoria não tenha sido encontrada ou req.body está vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar a Mercadoria via id=" + id,
      });
    });
};

// Deleta uma mercadoria pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Mercadoria.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Mercadoria foi deletada com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível deletar essa Mercadoria; Ela não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não é possível deletar Mercadoria com id=" + id,
      });
    });
};

// Deleta todos as Mercadorias do banco de dados
exports.deleteAll = (req, res) => {
  Mercadoria.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Mercadorias foramm deletadas com sucesso!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro enquanto deletava Mercadorias.",
      });
    });
};
