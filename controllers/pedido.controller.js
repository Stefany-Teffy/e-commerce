const db = require("../models");
const Pedido = db.Pedido;
const Op = db.Sequelize.Op;

// Cria e salva um novo pedido
exports.create = (req, res) => {
  // Validar requisição. Aqui verificamos se algum parâmetro está vazio
  if (!req.body.cliente_id || !req.body.estabelecimento_id) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!",
    });
    return;
  }

  // Criar um pedido
  const pedido = {
    cliente_id: req.body.cliente_id,
    estabelecimento_id: req.body.estabelecimento_id,
    data_pedido: req.body.data_pedido,
    status: req.body.status,
    total: req.body.total,
  };

  // Salvar pedidos no banco de dados
  Pedido.create(pedido)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a criação do Pedido.",
      });
    });
};

// Retorna todos os pedidos  do banco de dados. Podemos passar um parâmetro e filtrar
exports.findAll = (req, res) => {
  const cliente_id = req.query.cliente_id;
  var condition = cliente_id
    ? { cliente_id: { [Op.iLike]: `%${cliente_id}%` } }
    : null;

  Pedido.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a procura por Pedido.",
      });
    });
};

// Encontra um pedido pelo id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pedido.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível achar pedido com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro na busca por Pedido via id=" + id,
      });
    });
};

// Atualiza os dados de um pedido
exports.update = (req, res) => {
  const id = req.params.id;

  Pedido.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Pedido foi atualizao com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi possível atualizar Pedido com id=${id}. Talvez pedido não tenha sido encontrada ou req.body está vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar o Pedido via id=" + id,
      });
    });
};

// Deleta um pedido pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Pedido.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Pedido foi deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível deletar esse pedido; Ele não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não é possível deletar Pedidos com id=" + id,
      });
    });
};

// Deleta todos os Pedidos do banco de dados
exports.deleteAll = (req, res) => {
  Pedido.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Pedidos foram deletados com sucesso!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro enquanto deletava Pedidos.",
      });
    });
};
