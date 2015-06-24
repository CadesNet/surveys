/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('surveys', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: 'CHAR(1)',
      allowNull: false
    }
  },
  {
    classMethods:{
      associate:function(models){
        this.hasMany(models.questions, { foreignKey: 'survey_id'} );
      }
    }
  });
};
