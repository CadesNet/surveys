/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('answers_details', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    teacher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schedule: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    survey_id: {
      type: DataTypes.INTEGER(11),
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
