module.exports = (sequelize, Sequelize) => {
  const Pedido = sequelize.define(
    "pedido",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "cliente",
          key: "id",
        },
      },
      estabelecimento_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "estabelecimento",
          key: "id",
        },
      },
      data_pedido: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      status: {
        type: Sequelize.ENUM(
          "pendente",
          "em_processamento",
          "enviado",
          "entregue"
        ),
        defaultValue: "pendente",
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      // Garante que o nome da tabela no banco seja igual ao que informamos entre aspas com o sequelize.define()
      freezeTableName: true,
    }
  );

  return Pedido;
};
