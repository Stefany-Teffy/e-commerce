module.exports = (app) => {
  const clientes = require("../controllers/cliente.controller.js");
  var router = require("express").Router();
  // Rota para criar um cliente
  router.post("/", clientes.create);
  // Rota que retorna todos os clientes
  router.get("/", clientes.findAll);
  // Rota que retorna um cliente pelo id
  router.get("/:id", clientes.findOne);
  // Rota que atualiza um cliente pelo id
  router.put("/:id", clientes.update);
  // Rota para deletar um cliente pelo id
  router.delete("/:id", clientes.delete);
  // Rota para deletar todos os clientes
  router.delete("/", clientes.deleteAll);
  // A linha abaixo informa que todas esses clientes são encontradas após o /clientes. Isto é, localhost:8080/clientes/rota
  app.use("/clientes", router);
};
