module.exports = (app) => {
  const itens_pedidos = require("../controllers/item_pedido.controller.js");
  var router = require("express").Router();

  // Rota para criar um item de pedido
  router.post("/", itens_pedidos.create);

  // Rota que retorna todos os itens de pedido
  router.get("/", itens_pedidos.findAll);

  // Rota que retorna um item de pedido pelo id
  router.get("/:id", itens_pedidos.findOne);

  // Rota que atualiza um item de pedido pelo id
  router.put("/:id", itens_pedidos.update);

  // Rota para deletar um item de pedido pelo id
  router.delete("/:id", itens_pedidos.delete);

  // Rota para deletar todos os itens de pedido
  router.delete("/", itens_pedidos.deleteAll);

  // A linha abaixo informa que todos esses itens de pedido são encontrados após o /itens_pedido.
  // Isto é, localhost:8080/itens_pedido/rota
  app.use("/itens_pedidos", router);
};
