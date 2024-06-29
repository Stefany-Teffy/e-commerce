const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Definição das constantes para cada modelo
const Cliente = require("./cliente.model.js")(sequelize, Sequelize);
const Estabelecimento = require("./estabelecimento.model.js")(
  sequelize,
  Sequelize
);
const Mercadoria = require("./mercadoria.model.js")(sequelize, Sequelize);
const Tipo = require("./tipo.model.js")(sequelize, Sequelize);
const Pedido = require("./pedido.model.js")(sequelize, Sequelize);
const Item_Pedido = require("./item_pedido.model.js")(sequelize, Sequelize);
const Pagamento = require("./pagamento.model.js")(sequelize, Sequelize);
const Mercadoria_Tipo = require("./mercadoria_tipo.model.js")(
  sequelize,
  Sequelize
);

// Relacionamentos
/*
Cliente.hasMany(Pedido);
Pedido.belongsTo(Cliente);

Estabelecimento.hasMany(Mercadoria);
Mercadoria.belongsTo(Estabelecimento);

Tipo.hasMany(Mercadoria);
Mercadoria.belongsTo(Tipo);

Pedido.hasMany(Item_Pedido);
Item_Pedido.belongsTo(Pedido);

Mercadoria.hasMany(Item_Pedido);
Item_Pedido.belongsTo(Mercadoria);

Pedido.hasOne(Pagamento);
Pagamento.belongsTo(Pedido);

Mercadoria.belongsToMany(Tipo, { through: Mercadoria_Tipo });
Tipo.belongsToMany(Mercadoria, { through: Mercadoria_Tipo });
*/

// Configuração do objeto db para incluir as variáveis das tabelas
db.Cliente = Cliente;
db.Estabelecimento = Estabelecimento;
db.Mercadoria = Mercadoria;
db.Tipo = Tipo;
db.Pedido = Pedido;
db.Item_Pedido = Item_Pedido;
db.Pagamento = Pagamento;
db.Mercadoria_Tipo = Mercadoria_Tipo;

module.exports = db;
