module.exports = (app) => {
  const pedidos = require("../controllers/pedido.controller.js");
  var router = require("express").Router();

  // Rota para criar um pedido
  router.post("/", pedidos.create);

  // Rota que retorna todos os pedidos
  router.get("/", pedidos.findAll);

  // Rota que retorna um pedido pelo id
  router.get("/:id", pedidos.findOne);

  // Rota que atualiza um pedido pelo id
  router.put("/:id", pedidos.update);

  // Rota para deletar um pedido pelo id
  router.delete("/:id", pedidos.delete);

  // Rota para deletar todos os pedidos
  router.delete("/", pedidos.deleteAll);

  // A linha abaixo informa que todas esses pedidos são encontrados após o /pedidos.  Isto é, localhost:8080/pedidos/rota
  app.use("/pedidos", router);
};
