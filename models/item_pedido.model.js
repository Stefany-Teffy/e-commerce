module.exports = (sequelize, Sequelize) => {
  const Item_Pedido = sequelize.define(
    "item_pedido",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pedido_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "pedido",
          key: "id",
        },
      },
      mercadoria_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "mercadoria",
          key: "id",
        },
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      preco_unitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      total_item: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      // Garante que o nome da tabela no banco seja igual ao que informamos entre aspas com o sequelize.define()
      freezeTableName: true,
    }
  );

  return Item_Pedido;
};
