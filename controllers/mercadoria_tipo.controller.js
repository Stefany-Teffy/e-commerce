const db = require("../models");
const Mercadoria_Tipo = db.Mercadoria_Tipo;
const Op = db.Sequelize.Op;

// Cria e salva uma nova mercadoria_tipo
exports.create = (req, res) => {
  // Validar requisição. Aqui verificamos se algum parâmetro está vazio
  if (!req.body.mercadoria_id || !req.body.tipo_id) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!",
    });
    return;
  }

  // Criar uma mercadoria_tipo
  const mercadoria_tipo = {
    mercadoria_id: req.body.mercadoria_id,
    tipo_id: req.body.tipo_id,
  };

  // Salvar mercadoria_tipo no banco de dados
  Mercadoria_Tipo.create(mercadoria_tipo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a criação de mercadoria_tipo.",
      });
    });
};

// Retorna todos as mercadoria_tipo do banco de dados. Podemos passar um parâmetro e filtrar
exports.findAll = (req, res) => {
  const mercadoria_id = req.query.mercadoria_id;
  var condition = mercadoria_id ? { mercadoria_id: { [Op.iLike]: `%${mercadoria_id}%` } } : null;

  Mercadoria_Tipo.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a procura por mercadoria_tipo.",
      });
    });
};

// Encontra uma mercadoria_tipo pelo id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Mercadoria_Tipo.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível achar Mercadoria_Tipo com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro na busca por Mercadoria_Tipo via id=" + id,
      });
    });
};

// Atualiza os dados de uma mercadoria_tipo
exports.update = (req, res) => {
  const id = req.params.id;

  Mercadoria_Tipo.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Mercadoria_Tipo foi atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi possível atualizar Mercadoria_Tipo com id=${id}. Talvez mercadoria_tipo não tenha sido encontrada ou req.body está vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar o Mercadoria_Tipo via id=" + id,
      });
    });
};

// Deleta uma mercadoria_tipo pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Mercadoria_Tipo.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Mercadoria_Tipo foi deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível deletar esse Mercadoria_Tipo; Ele não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não é possível deletar Mercadoria_Tipo com id=" + id,
      });
    });
};

// Deleta todos as Mercadorias_Tipos do banco de dados
exports.deleteAll = (req, res) => {
  Mercadoria_Tipo.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Mercadorias_Tipos foramm deletadas com sucesso!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro enquanto deletava Mercadorias_Tipos.",
      });
    });
};
