/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('options', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    option: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  });
};
