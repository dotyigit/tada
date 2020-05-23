module.exports = (sequelize, Sequelize) => {
    var Todo = sequelize.define("todo", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    });
  
    return Todo;
  };