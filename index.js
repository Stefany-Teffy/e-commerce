const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin:
    "Aqui informamos quais urls permitimos que sejam conectadas ao nosso backend. Iremos alterar para a url do nosso frontend",
};

app.use(cors(corsOptions));
//parser de requisições com content type - application/json
app.use(express.json());
//parser de requisições com content type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", function (req, res) {
  res.send("Desenvolvimento de Aplicações WEB II");
});

app.get("/ComercioEletronico", function (req, res) {
  res.send(" AvaliaçãoI- DAW II");
});

require("./routes/cliente.routes")(app);
require("./routes/estabelecimento.routes")(app);
require("./routes/item_pedido.routes")(app);
require("./routes/mercadoria.routes")(app);
require("./routes/pagamento.routes")(app);
require("./routes/pedido.routes")(app);
require("./routes/tipo.routes")(app);
require("./routes/mercadoria_tipo.routes")(app);

app.listen(8000, function (req, res) {
  console.log("App rodando na porta 8000");
});
