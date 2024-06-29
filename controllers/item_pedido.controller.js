const db = require("../models");
const Item_Pedido = db.Item_Pedido;
const Op = db.Sequelize.Op;

// Cria e salva um novo item_pedido
exports.create = (req, res) => {
  // Validar requisição. Aqui verificamos se algum parâmetro está vazio
  if (!req.body.total_item) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!",
    });
    return;
  }

  // Criar um item_pedido
  const item_pedido = {
    pedido_id: req.body.pedido_id,
    mercadoria_id: req.body.mercadoria_id,
    quantidade: req.body.quantidade,
    preco_unitario: req.body.preco_unitario,
    total_item: req.body.total_item,
  };

  // Salvar item_pedido no banco de dados
  Item_Pedido.create(item_pedido)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a criação do Item_Pedido.",
      });
    });
};

// Retorna todos os itens_pedidos  do banco de dados. Podemos passar um parâmetro e filtrar
exports.findAll = (req, res) => {
  const mercadoria_id = req.query.mercadoria_id;
  var condition = mercadoria_id ? { mercadoria_id: { [Op.iLike]: `%${mercadoria_id}%` } } : null;

  Item_Pedido.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a procura por Item_Pedido.",
      });
    });
};

// Encontra um item_pedido pelo id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Item_Pedido.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível achar item_pedido com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro na busca por Item_Pedido via id=" + id,
      });
    });
};

// Atualiza os dados de um item_pedido
exports.update = (req, res) => {
  const id = req.params.id;

  Item_Pedido.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Item_Pedido foi atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi possível atualizar Item_Pedido com id=${id}. Talvez item_pedido não tenha sido encontrada ou req.body está vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar o Item_Pedido via id=" + id,
      });
    });
};

// Deleta um item_pedido pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Item_Pedido.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Item_Pedido foi deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível deletar esse item_pedido; Ele não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não é possível deletar Itens_Pedidos com id=" + id,
      });
    });
};

// Deleta todos os Itens_Pedidos do banco de dados
exports.deleteAll = (req, res) => {
  Item_Pedido.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Itens_Pedidos foram deletados com sucesso!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro enquanto deletava Itens_Pedidos.",
      });
    });
};
