module.exports = (app) => {
  const estabelecimentos = require("../controllers/estabelecimento.controller.js");
  var router = require("express").Router();
  // Rota para criar um estabelecimento
  router.post("/", estabelecimentos.create);
  // Rota que retorna todos os estabelecimentos
  router.get("/", estabelecimentos.findAll);
  // Rota que retorna um estabelecimento pelo id
  router.get("/:id", estabelecimentos.findOne);
  // Rota que atualiza um estabelecimento pelo id
  router.put("/:id", estabelecimentos.update);
  // Rota para deletar um estabelecimento pelo id
  router.delete("/:id", estabelecimentos.delete);
  // Rota para deletar todos os estabelecimentos
  router.delete("/", estabelecimentos.deleteAll);
  // A linha abaixo informa que todos esses estabelecimentos são encontrados após o /estabelecimentos. Isto é, localhost:8080/estabelecimentos/rota
  app.use("/estabelecimentos", router);
};
