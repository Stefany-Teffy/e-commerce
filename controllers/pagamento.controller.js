const db = require("../models");
const Pagamento = db.Pagamento;
const Op = db.Sequelize.Op;

// Cria e salva um novo pagamento
exports.create = (req, res) => {
  // Validar requisição. Aqui verificamos se algum parâmetro está vazio
  if (!req.body.metodo_pagamento) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!",
    });
    return;
  }

  // Criar um pagamento
  const pagamento = {
    pedido_id: req.body.pedido_id,
    metodo_pagamento: req.body.metodo_pagamento,
    valor_pago: req.body.valor_pago,
    data_pagamento: req.body.data_pagamento,
  };

  // Salvar pagamentos no banco de dados
  Pagamento.create(pagamento)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a criação do Pagamento.",
      });
    });
};

// Retorna todos os pagamentos do banco de dados. Podemos passar um parâmetro e filtrar
exports.findAll = (req, res) => {
  const metodo_pagamento = req.query.metodo_pagamento;
  var condition = metodo_pagamento
    ? { metodo_pagamento: { [Op.iLike]: `%${metodo_pagamento}%` } }
    : null;

  Pagamento.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a procura por Pagamento.",
      });
    });
};

// Encontra um pagamento pelo id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pagamento.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível achar pagamento com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro na busca por Pagamento via id=" + id,
      });
    });
};

// Atualiza os dados de um pagamento
exports.update = (req, res) => {
  const id = req.params.id;

  Pagamento.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Pagamento foi atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi possível atualizar Pagamento com id=${id}. Talvez pagamento não tenha sido encontrada ou req.body está vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar o Pagamento via id=" + id,
      });
    });
};

// Deleta um pagamento pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Pagamento.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Pagamento foi deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível deletar esse pagamento; Ele não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não é possível deletar Pagamento com id=" + id,
      });
    });
};

// Deleta todos os Pagamentos do banco de dados
exports.deleteAll = (req, res) => {
  Pagamento.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Pagamentos foram deletados com sucesso!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro enquanto deletava Pagamentos.",
      });
    });
};
