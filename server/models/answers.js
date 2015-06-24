/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('answers', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    answers_details_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    type: {
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
