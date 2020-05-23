var db = require('../models');
var Todo = db.todos;
var Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(db);
    if (!req.body.title) {
        res.status(400).send({
          message: 'Content can not be empty!'
        });
        return;
    }
    
    var todo = {
        title: req.body.title,
        description: req.body.description,
        isCompleted: req.body.isCompleted
    };
    
    Todo.create(todo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || 'Some error occurred while creating the Todo.'
            });
        });
};

exports.findAll = (req, res) => {
    var title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Todo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || 'Some error occurred while retrieving tutorials.'
        });
    });
};

exports.findOne = (req, res) => {
    var id = req.params.id;

    Todo.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving Tutorial with id=' + id
        });
    });
    
};

exports.update = (req, res) => {
    var id = req.params.id;

    Todo.update(req.body, {
      where: { id: id }
    })
        .then(num => {
            if (num == 1) {
            res.send({
                message: 'Todo was updated successfully.'
            });
            } else {
            res.send({
                message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating Todo with id=' + id
            });
        });
};

exports.delete = (req, res) => {
    var id = req.params.id;

    Todo.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Todo was deleted successfully!'
            });
            } else {
                res.send({
                    message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete Todo with id=' + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Todo.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Todos were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || 'Some error occurred while removing all todos.'
            });
        });
};

exports.findAllCompleted = (req, res) => {
    Todo.findAll({ where: { isCompleted: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || 'Some error occurred while retrieving todos.'
      });
    });
};
