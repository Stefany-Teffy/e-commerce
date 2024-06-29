module.exports = (app) => {
  const mercadoria_tipo = require("../controllers/mercadoria_tipo.controller.js");
  var router = require("express").Router();

  // Rota para criar uma mercadoria_tipo
  router.post("/", mercadoria_tipo.create);

  // Rota que retorna todas as mercadorias_tipos
  router.get("/", mercadoria_tipo.findAll);

  // Rota que retorna uma mercadoria_tipo pelo id
  router.get("/:id", mercadoria_tipo.findOne);

  // Rota que atualiza uma mercadoria_tipo pelo id
  router.put("/:id", mercadoria_tipo.update);

  // Rota para deletar uma mercadoria_tipo pelo id
  router.delete("/:id", mercadoria_tipo.delete);

  // Rota para deletar todas as mercadorias de tipo
  router.delete("/", mercadoria_tipo.deleteAll);

  // A linha abaixo informa que todas essas mercadorias_tipos são encontrados após o /mercadoria_tipos.
  // Isto é, localhost:8080/mercadoria_tipo/rota
  app.use("/mercadoria_tipo", router);
};
