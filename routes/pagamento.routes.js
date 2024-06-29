module.exports = (app) => {
  const pagamentos = require("../controllers/pagamento.controller.js");
  var router = require("express").Router();

  // Rota para criar um pagamento
  router.post("/", pagamentos.create);

  // Rota que retorna todos os pagamentos
  router.get("/", pagamentos.findAll);

  // Rota que retorna um pagamento pelo id
  router.get("/:id", pagamentos.findOne);

  // Rota que atualiza um pagamento pelo id
  router.put("/:id", pagamentos.update);

  // Rota para deletar um pagamento pelo id
  router.delete("/:id", pagamentos.delete);

  // Rota para deletar todos os pagamentos
  router.delete("/", pagamentos.deleteAll);

  // A linha abaixo informa que todos esses pagamentos são encontrados após o /pagamentos.  Isto é, localhost:8080/pagamentos/rota
  app.use("/pagamentos", router);
};
