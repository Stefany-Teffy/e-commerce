module.exports = (sequelize, Sequelize) => {
  const Pagamento = sequelize.define(
    "pagamento",
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
      metodo_pagamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor_pago: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      data_pagamento: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      // Garante que o nome da tabela no banco seja igual ao que informamos entre aspas com o sequelize.define()
      freezeTableName: true,
    }
  );

  return Pagamento;
};
